const router = require("express").Router();
const asyncHandler = require("express-async-handler");

const flattener = require("../utils/flattener");
const { validateCheckIn, validateVenue } = require("../utils/validators");
const { requireAuth } = require("../../utils/auth");
const { Venue, CheckIn } = require("../../db/models");
const checkInsRouter = require("./checkIns");

router.use("/checkIns", checkInsRouter);

router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const venues = await Venue.findAll();
    res.json(flattener(venues));
  })
);

router.post(
  "/",
  requireAuth,
  validateVenue,
  asyncHandler(async (req, res) => {
    const { body: { name, }, user } = req;

    const venue = await Venue.create({
      name,
      userId: user.id,
    });

    res.json({ venue });
  })
);

router.post(
  "/:venueId(\\d+)/checkIns",
  requireAuth,
  validateCheckIn,
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.venueId, 10);
    const venue = await Venue.findByPk(id);
    const { user } = req;
    const { timestamp } = req.body;

    if (!venue) {
      const err = new Error("Invalid Venue.");
      err.status = 400;
      err.title = "Invalid Venue.";
      err.errors = ["The provided venue does not exist."];
      return next(err);
    }

    const checkIn = await CheckIn.create({
      userId: user.id,
      venueId: venue.id,
      timestamp,
    });

    res.json(checkIn);
  })
);

module.exports = router;
