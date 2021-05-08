const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { validateDrinkReview } = require('../utils/validators');
const { DrinkReview } = require('../../db/models');

router.put('/:reviewId(\\d+)', validateDrinkReview, asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const id = parseInt(reviewId, 10);
  const { review, rating } = req.body;

  const reviewObj = await DrinkReview.findByPk(id);
  await reviewObj.update({
    review,
    stars: rating,
  });

  res.json(review);
}));

router.delete('/:reviewId(\\d+)', asyncHandler(async (req, res) => {
  const reviewId = req.params.reviewId;
  const id = parseInt(reviewId, 10);
  const review = await DrinkReview.findByPk(id);
  await review.destroy();

  return res.json({ message: 'success' });
}));

module.exports = router;
