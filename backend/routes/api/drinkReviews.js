const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { DrinkReview, Drink } = require('../../db/models');

const router = express.Router();

const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a review message.'),
  check('rating')
    .exists({ checkFalsy: false })
    .notEmpty()
    .withMessage('Please provide a value for the rating between 0 and 5, inclusive.'),
  handleValidationErrors,
];

router.post('/', validateReview, asyncHandler(async (req, res) => {
  const { userId, drinkId, review, rating } = req.body;
  const reviewObj = await DrinkReview.create({ userId, drinkId, review, stars: rating });
  res.json({
    review: reviewObj,
  });
}));

router.put('/:reviewId(\\d+)', validateReview, asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const id = parseInt(reviewId, 10);
  const { review, rating } = req.body;

  const reviewObj = await DrinkReview.findByPk(id);
  await reviewObj.update({
    review,
    stars: rating,
  });

  res.json({
    review,
  });
}));

router.delete('/:reviewId(\\d+)', asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const id = parseInt(reviewId, 10);
  const review = await DrinkReview.findByPk(id);

  await review.destroy();

  return res.json({ message: 'success' });
}));

module.exports = router;
