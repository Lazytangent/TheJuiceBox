const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { validateCheckIn, validateStars } = require('../utils/validators');
const { requireAuth } = require('../../utils/auth');
const { Venue, CheckIn } = require('../../db/models');

router.get('/', asyncHandler(async (_req, res) => {
  const venues = await Venue.findAll();
  res.json({ venues });
}));

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
