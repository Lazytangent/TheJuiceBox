const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const drinksRouter = require("./drinks.js");
const venuesRouter = require("./venues");
const checkInsRouter = require("./checkIns");

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/drinks", drinksRouter);
router.use("/venues", venuesRouter);
router.use("/checkIns", checkInsRouter);

module.exports = router;
