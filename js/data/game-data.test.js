import {initialState, incLevel} from "./game-data";
import chai from "chai";

const expect = chai.expect;

export const getTestState = (newParams = {}, parentState = initialState) => {
  return Object.assign({}, parentState, {
    stats: parentState.stats.slice()
  }, newParams);
};

const testStateLevel = {
  1: getTestState(),
  2: getTestState({gameNumb: 2}),
  3: getTestState({gameNumb: 3})
};

describe(`Game`, function () {
  describe(`Level increaser`, function () {
    it(`should increase level by one`, function () {
      const testState = getTestState();
      const previous = testState.gameNumb;
      incLevel(testState);

      expect(testState.gameNumb).to.equal(previous + 1);
    });
  });
});
