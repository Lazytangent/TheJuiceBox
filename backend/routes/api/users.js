const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Drink, DrinkReview } = require('../../db/models');

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
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Password confirmation field does not match password field.'),
  check('dateOfBirth')
    .exists({ checkFalsy: true })
    .isISO8601()
    .custom((value) => {
      const valueDate = new Date(value);
      const oldDate = new Date('1903-01-03');
      if (valueDate - oldDate <= 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage('Date of Birth must be a valid date.'),
  handleValidationErrors,
];

router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username, dateOfBirth } = req.body;
  const user = await User.signup({ email, username, password, dateOfBirth });

  await setTokenCookie(res, user);

  return res.json({ user: user.toSafeObject() });
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Drink,
      },
      {
        model: DrinkReview,
      },
    ]
  });

  res.json({ user });
}));

module.exports = router;
