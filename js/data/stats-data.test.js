import {getTableData, getBonus, statsHashDecypher, statsHashCypher} from "./stats-data";
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

describe(`Routing`, function () {
  const testCorrectStats = Array(10).fill(`correct`);
  const testWrongtStats = Array(10).fill(`wrong`);

  const testCorrectParams = `2222222222`;
  const testWrongParams = `0000000000`;

  describe(`Stats cypher`, function () {
    it(`should return string`, function () {
      expect(statsHashCypher(testCorrectStats)).to.be.a(`string`);
    });

    it(`should be equal to "2x10" when param [correct x 10] passed in`, function () {
      expect(statsHashCypher(testCorrectStats)).to.equal(testCorrectParams);
    });

    it(`should be equal to "0x10" when param [wrong x 10] passed in`, function () {
      expect(statsHashCypher(testWrongtStats)).to.equal(testWrongParams);
    });
  });

  describe(`Stats hash decypher`, function () {
    it(`should return array`, function () {
      expect(statsHashDecypher(`1023230122`));
    });

    it(`should be equal to [correct x 10] when param "2x10" passed in`, function () {
      expect(statsHashDecypher(testCorrectParams)).to.deep.equal(testCorrectStats);
    });

    it(`should be equal to [wrong x 10] when param "0x10" passed in`, function () {
      expect(statsHashDecypher(testWrongParams)).to.deep.equal(testWrongtStats);
    });
  });
});
