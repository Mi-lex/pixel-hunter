import {initialState, getTableData, getBonus, incLevel, isAnswerCorrect, getLevel, statsHashDecypher, statsHashCypher} from "./data";
import chai from "chai";

const expect = chai.expect;

const getTestState = (newParams = {}, parentState = initialState) => {
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
      const testState = Object.assign({}, initialState, {
        state: initialState.stats.slice()
      });
      const previous = testState.gameNumb;
      incLevel(testState);

      expect(testState.gameNumb).to.equal(previous + 1);
    });
  });

  describe(`Answer validation`, function () {
    const testLevel = {
      1: getLevel(1),
      2: getLevel(2),
      3: getLevel(3)
    };

    const testFunction = (levelNumb, testAnswer, expectedReturn) => {
      it(`should return ${expectedReturn} when answer is ${testAnswer} on ${levelNumb} level`, function () {
        expect(isAnswerCorrect(testAnswer, testStateLevel[levelNumb])).to.equal(expectedReturn);
      })
    };

    it(`should return boolean`, function () {
      expect(isAnswerCorrect(`photo`, testStateLevel[1])).to.be.a(`boolean`);
    });

    testFunction(1, testLevel[1].answer, true);
    testFunction(2, testLevel[2].answer, true);
    testFunction(3, testLevel[3].answer, true);

    testFunction(1, `boom`, false);
    testFunction(2, `boom`, false);
    testFunction(3, `boom`, false);
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
      expect(statsHashDecypher(`1023230122`))
    });

    it(`should be equal to [correct x 10] when param "2x10" passed in`, function () {
      expect(statsHashDecypher(testCorrectParams)).to.deep.equal(testCorrectStats);
    });

    it(`should be equal to [wrong x 10] when param "0x10" passed in`, function () {
      expect(statsHashDecypher(testWrongParams)).to.deep.equal(testWrongtStats);
    });
  });
});
