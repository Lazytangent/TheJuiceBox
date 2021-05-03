const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { requireAuth } = require('../../utils/auth');
const { CheckIn } = require('../../db/models');

router.get('/', requireAuth, asyncHandler(async (req, res) => {
  const { user } = req;
  const checkIns = await CheckIn.findByUserId(user.id);
  res.json({ checkIns });
}));

module.exports = router;
