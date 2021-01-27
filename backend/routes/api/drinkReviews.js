const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { DrinkReview, Drink } = require('../../db/models');

const router = express.Router();

module.exports = router;
