import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import drinksReducer, * as drinkActions from '../drinks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const drinks = [
  {
    id: 1,
    name: "Test Drink 1",
    description: "Test Drink 1 description",
    creatorId: 1,
  },
  {
    id: 2,
    name: "Test Drink 2",
    description: "Test Drink 2 description",
    creatorId: 2,
  }
];

const SET_DRINKS = 'drinks/SET_DRINKS';
const SET_DRINK = 'drinks/SET_DRINK';
const REMOVE_DRINK = 'drinks/REMOVE_DRINK';

describe("getDrinks()", () => {
  beforeEach(() => {
    fetchMock.getOnce('/api/drinks', {
      body: drinks,
      headers: { "Content-Type": "application/json" },
    });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  test("should call GET /api/drinks at least once", () => {
    const store = mockStore({ drinks: {} });
    store.dispatch(drinkActions.getDrinks()).then(() => {
      const result = fetchMock.called("/api/drinks");
      expect(result).toBe(true);
    });
  });
});