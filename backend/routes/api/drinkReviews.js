const router = require('express').Router();
const asyncHandler = require('express-async-handler');

const flattener = require('../utils/flattener');
const { validateReview } = require('../utils/validators');
const { DrinkReview } = require('../../db/models');

router.get('', asyncHandler(async (req, res) => {
  const drinkId = parseInt(req.params.drinkId, 10);
  const reviews = await DrinkReview.findAll({
    where: {
      drinkId,
    },
  });
  res.json(flattener(reviews));
}));

router.post('/', validateReview, asyncHandler(async (req, res) => {
  const { userId, drinkId, review, rating } = req.body;
  const reviewObj = await DrinkReview.create({ userId, drinkId, review, stars: rating });
  res.json(reviewObj);
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
