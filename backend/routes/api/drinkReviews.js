const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const { validateReview } = require('../utils/validators');
const { DrinkReview } = require('../../db/models');

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
