const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const flattener = require('../utils/flattener');
const { validateSignup } = require('../utils/validators.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, CheckIn } = require('../../db/models');

router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username, dateOfBirth } = req.body;
  const user = await User.signup({ email, username, password, dateOfBirth });

  await setTokenCookie(res, user);
  return res.json(user.toSafeObject());
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findUserWithStuff(userId);

  res.json(user);
}));

router.get('/checkIns', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  const checkIns = await CheckIn.findByUserId(user.id);
  res.json(flattener(checkIns));
}));

module.exports = router;
