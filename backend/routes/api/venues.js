const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Venue, CheckIn } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (_req, res) => {
  const venues = await Venue.findAll();
  res.json({ venues });
}));

const validateCheckIn = [
  check("timestamp")
    .exists({ checkFalse: true })
    .notEmpty()
    .withMessage("Please provide a timestamp.")
    .isISO8601()
    .custom((value) => {
      const valueDate = new Date(value);
      const currentDate = new Date();
      if (currentDate - valueDate < 0) return false;
      return true;
    })
    .withMessage("Timestamp for checkin must be in the past or the current timestamp."),
  handleValidationErrors,
];

router.post('/:venueId(\\d+)/checkIns', requireAuth, validateCheckIn, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.venueId, 10);
  const venue = await Venue.findByPk(id);
  const { user } = req;
  const { timestamp } = req.body;

  const checkIn = await CheckIn.create({
    userId: user.id,
    venueId: venue.id,
    timestamp,
  });

  res.json(checkIn);
}));

const validateStars = [
  check("stars")
    .custom((value) => {
      if (value < 0 || value > 5) return false;
      return true;
    })
    .withMessage("Please provide number for stars between 0 and 5."),
  handleValidationErrors,
];

router.put('/:venueId(\\d+)/checkIns/:checkInId(\\d+)', requireAuth, validateCheckIn, validateStars, asyncHandler(async (req, res) => {
  const checkInId = parseInt(req.params.checkInId, 10);

  const checkIn = await CheckIn.findByPk(checkInId);
  const { timestamp, review, stars, liked } = req.body;
  await checkIn.update({ timestamp, review, liked, stars });

  res.json(checkIn);
}));

router.delete('/:venueId(\\d+)/checkIns/:checkInId(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const checkInId = parseInt(req.params.checkInId, 10);

  const checkIn = await CheckIn.findByPk(checkInId);
  const { user } = req;

  if (checkIn.userId !== user.id) res.json({ message: "Invalid user." });
  else {
    await checkIn.destroy();
    res.json({ message: "Successfully deleted." });
  }
}));

module.exports = router;
