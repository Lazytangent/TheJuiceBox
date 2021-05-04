const SET_REVIEWS = 'drinkReviews/SET_REVIEWS';
const REMOVE_REVIEW = 'drinkReviews/REMOVE_REVIEW';

const setReviews = (reviews) => ({
  type: SET_REVIEWS,
  reviews,
});
