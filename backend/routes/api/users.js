const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  check('confirmPassword')
    .exists({ checkFalsy: true })
    .custom((value, { req }) => value !== req.body.password)
    .withMessage('Confirm Password field must match Password.'),
  check('dateOfBirth')
    .exists({ checkFalsy: true })
    .withMessage('Date of Birth must be a valid date.'),
  handleValidationErrors,
];

router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username, dateOfBirth } = req.body;
  const user = await User.signup({ email, username, password, dateOfBirth });

  await setTokenCookie(res, user);

  return res.json({ user: user.toSafeObject() });
}));

module.exports = router;
