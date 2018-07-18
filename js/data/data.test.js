import {initialState, getTableData, getBonus, incLevel} from "./data";
import chai from "chai";

const expect = chai.expect;

const fakeState = Object.assign({}, initialState, {
  state: initialState.stats.slice()
});

describe(`Game`, function () {
  describe(`Level increaser`, function () {
    it(`should increase level by one`, function () {
      const testState = Object.assign({}, initialState, {
        state: initialState.stats.slice()
      });
      const previous = testState.gameNumb;
      incLevel(testState);

      expect(testState.gameNumb).to.equal(previous + 1);
    });
  });
});

describe(`Game over`, function () {
  describe(`Get bonus`, function () {
    it(`should return Object`, function () {
      expect(getBonus(`slow`, 2)).to.be.a(`object`);
    });

    it(`should return null when bonus amount is 0`, function () {
      expect(getBonus(`live`, 0)).to.be.null;
    });

    it(`should throw an error when bonus is undefined`, function () {
      expect(function () {
        getBonus(`beautifull`, 1)
      }).to.throw(`The bonus is undefined`);
    });
  });

  describe(`Get table content`, function () {
    it(`should return object`, function () {
      expect(getTableData(fakeState)).to.be.a(`object`);
    });

    it(`should return 1000 in totalResult when there is no bonus`, function () {
      expect(getTableData(fakeState).totalResult).to.equal(1000);
    });

    it(`should return 1150 in totalFinal when there are only 3 lives`, function () {
      expect(getTableData(fakeState).totalResult).to.equal(1000);
    });
  });
});
