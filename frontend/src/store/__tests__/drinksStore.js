import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";

import { SET_DRINKS, SET_DRINK, REMOVE_DRINK } from "../constants";
import { setDrinks, createDrink, removeDrink } from "../actions";
import drinksReducer, {
  getDrinks,
  getDrinkById,
  mixDrink,
  updateDrink,
  deleteDrink,
} from "../drinks";

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
  },
];

describe("Drink Redux", () => {
  const initialState = { drinks: { allIds: [], byIds: {} } };

  describe("getDrinks()", () => {
    beforeEach(() => {
      fetchMock.getOnce("/api/drinks", {
        body: drinks,
        headers: { "Content-Type": "application/json" },
      });
    });

    afterEach(() => {
      fetchMock.restore();
    });

    test("should call GET /api/drinks at least once", () => {
      const store = mockStore(initialState);
      store.dispatch(getDrinks()).then(() => {
        const result = fetchMock.called("/api/drinks");
        expect(result).toBe(true);
      });
    });
  });

  describe("getDrinkById()", () => {
    beforeEach(() => {
      fetchMock.getOnce("/api/drinks/1", {
        body: drinks[0],
        headers: { "Content-Type": "application/json" },
      });
    });

    afterEach(() => {
      fetchMock.restore();
    });

    test("should call GET /api/drinks/:id at least once", () => {
      const store = mockStore(initialState);
      store.dispatch(getDrinkById(1)).then(() => {
        const result = fetchMock.called("/api/drinks/1");
        expect(result).toBe(true);
      });
    });
  });
});
