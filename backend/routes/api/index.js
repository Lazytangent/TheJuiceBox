const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const drinksRouter = require('./drinks.js');
const venuesRouter = require('./venues');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/drinks', drinksRouter);
router.use('/venues', venuesRouter);

module.exports = router;
