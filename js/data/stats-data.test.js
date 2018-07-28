import {getTableData, getBonus} from "./stats-data";
import {getTestState} from "./game-data.test.js";
import chai from "chai";

const expect = chai.expect;

const testStateLevel = {
  1: getTestState(),
  2: getTestState({gameNumb: 2}),
  3: getTestState({gameNumb: 3})
};

describe(`Game over`, function () {
  describe(`Get bonus`, function () {
    it(`should return Object`, function () {
      expect(getBonus(`slow`, 2)).to.be.a(`object`);
    });

    it(`should return null when bonus amount is 0`, function () {
      expect(getBonus(`live`, 0)).to.be.null;
    });

    it(`should throw an error when bonus is undefined`, function () {
      const getBonusOuter = () => {
        getBonus(`beautifull`, 1);
      };

      expect(getBonusOuter).to.throw(`The bonus is undefined`);
    });
  });

  describe(`Get table content`, function () {
    it(`should return object`, function () {
      expect(getTableData(testStateLevel[1].stats)).to.be.a(`object`);
    });

    it(`should return 1000 in totalResult when there is no bonus`, function () {
      expect(getTableData(testStateLevel[1].stats).totalResult).to.equal(1000);
    });

    it(`should return 1150 in totalFinal when there are only 3 lives`, function () {
      expect(getTableData(testStateLevel[1].stats).totalResult).to.equal(1000);
    });
  });
});
