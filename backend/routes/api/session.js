const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { validateLogin } = require('../utils/validators');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject()
    });
  } else return res.json({});
});

router.post('/', validateLogin, asyncHandler(async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
  }

  await setTokenCookie(res, user);
  return res.json({
    user: user.toSafeObject(),
  });
}));

router.delete('/', (_req, res) => {
  res.clearCookie('token');
  return res.json({ message: 'success' });
});

router.post('/demo', asyncHandler(async (req, res) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  await setTokenCookie(res, user);
  return res.json({
    user: user.toSafeObject(),
  });
}));

module.exports = router;
