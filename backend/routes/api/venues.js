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

router.post('/:venueId(\\d+)/checkIns', requireAuth, asyncHandler(async (req, res) => {
  const id = parseInt(req.params.venueId, 10);
  const venue = await Venue.findByPk(id);
  const { user } = req;

  const checkIn = await CheckIn.create({
    userId: user.id,
    venueId: venue.id,
  });
  // Not done yet...
  res.json({ venue });
}));

router.put('/:venueId(\\d+)/checkIns/:checkInId(\\d+)', asyncHandler(async (req, res) => {
  // For updates and creations of reviews of venues
}));

router.delete('/:venueId(\\d+)/checkIns/:checkInId(\\d+)', asyncHandler(async (req, res) => {
  // For removing a review of a venue
}));

module.exports = router;
