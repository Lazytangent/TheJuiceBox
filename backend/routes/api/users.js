/**
  * Express router providing user related routes.
  * @module routes/api/users
  * @requires express
  * @requires express-async-handler
  */

/**
  * Express router to mount user related functions on.
  * @type {object}
  * @const
  * @namespace usersRouter
  */
const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const flattener = require('../utils/flattener');
const { validateSignup } = require('../utils/validators.js');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, CheckIn, Drink, DrinkReview } = require('../../db/models');

/**
  * Route handling user signup.
  * @name POST /api/users
  * @function
  * @memberof module:routes/api/users~usersRouter
  * @inner
  * @param {string} path - Express path
  * @param {callback} middleware - Express middleware
  */
router.post('/', validateSignup, asyncHandler(async (req, res) => {
  const { email, password, username, dateOfBirth } = req.body;
  const user = await User.signup({ email, username, password, dateOfBirth });

  setTokenCookie(res, user);
  return res.json(user.toSafeObject());
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = await User.findByPk(userId);
  const drinks = await Drink.findAll({ where: { creatorId: userId } });
  const reviews = await DrinkReview.findAll({ where: { userId }, include: User });
  user.Drinks = drinks.map((drink) => drink.id);
  user.DrinkReviews = reviews.map((review) => review.id);

  res.json({ user, drinks, reviews });
}));

router.get('/checkIns', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  const checkIns = await CheckIn.findByUserId(user.id);
  res.json(flattener(checkIns));
}));

module.exports = router;
