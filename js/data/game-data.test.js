import {initialState, incLevel} from "./game-data";
import chai from "chai";

const expect = chai.expect;

export const getTestState = (newParams = {}, parentState = initialState) => {
  return Object.assign({}, parentState, {
    stats: parentState.stats.slice()
  }, newParams);
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
