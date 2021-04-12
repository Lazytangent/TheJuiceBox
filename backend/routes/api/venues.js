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

router.put('/:venueId(\\d+)/checkIns/:checkInId(\\d+)', requireAuth, validateCheckIn, asyncHandler(async (req, res) => {
  // For updates and creations of reviews of venues
  const checkInId = parseInt(req.params.checkInId, 10);

  const checkIn = await CheckIn.findByPk(checkInId);
}));

router.delete('/:venueId(\\d+)/checkIns/:checkInId(\\d+)', asyncHandler(async (req, res) => {
  // For removing a review of a venue
}));

module.exports = router;
