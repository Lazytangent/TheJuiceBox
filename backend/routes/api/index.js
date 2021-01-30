const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const drinksRouter = require('./drinks.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/drinks', drinksRouter);

module.exports = router;
