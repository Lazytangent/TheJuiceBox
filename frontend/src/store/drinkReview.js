import { fetch } from './csrf';

const SET_REVIEWS = 'drinkReview/SET_REVIEWS';
const CREATE_REVIEW = 'drinkReview/CREATE_REVIEW';
const REMOVE_REVIEW = 'drinkReview/REMOVE_REVIEW';

const setReviews = (reviews) => {
  return {
    type: SET_REVIEWS,
    reviews,
  };
};

const createReview = (review) => {
  return {
    type: CREATE_REVIEW,
    review,
  };
};

const removeReview = (id) => {
  return {
    type: REMOVE_REVIEW,
    id,
  };
};
