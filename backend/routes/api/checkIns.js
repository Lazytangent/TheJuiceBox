const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Venue, CheckIn } = require('../../db/models');

const router = express.Router();

router.get('/', restoreUser, asyncHandler(async (req, res) => {
  const { user } = req;
  const checkIns = await CheckIn.findAll({
    where: {
      userId: user.id,
    }
  });
  res.json({ checkIns });
}));

module.exports = router;
