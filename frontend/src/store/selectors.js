export const session = {
  user: () => (state) => state.session.user,
};

export const drinks = {
  all: () => (state) => state.drinks.allIds.map((id) => state.drinks.byIds[id]),
  byId: (id) => (state) => state.drinks.byIds[id],
};

export const drinkReviews = {
  byDrinkId: (drinkId) => state => {
    return state.drinks.byIds[drinkId]?.Reviews?.map((reviewId) => {
      return state.drinkReviews.byIds[reviewId];
    });
  },
};
