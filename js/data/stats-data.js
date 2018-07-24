import {initialState} from "./game-data";

const ALIVE = `alive`;
const SLOW = `slow`;
const FAST = `fast`;
const CORRECT = `correct`;
const WRONG = `wrong`;

export const resultType = {
  SLOW,
  FAST,
  CORRECT,
  WRONG
};

const bonuses = Object.freeze({
  [FAST]: {
    title: `Бонус за скорость`,
    classTitle: FAST,
    cost: 50
  },
  [ALIVE]: {
    title: `Бонус за жизнь`,
    classTitle: ALIVE,
    cost: 50
  },
  [SLOW]: {
    title: `Штраф за медлительность`,
    classTitle: SLOW,
    cost: -50
  }
});

export const getBonus = (bonusName, amount) => {
  if (!amount) {
    return null;
  }

  const bonus = bonuses[bonusName];

  if (!bonus) {
    throw new Error(`The bonus is undefined`);
  } else {
      return {
        title: bonus.title,
        classTitle: bonus.classTitle,
        amount,
        points: amount * bonus.cost
      };
  }
};

export const getTableData = (stats) => {
  const totalResult = stats.filter((el) => el !== `wrong`).length * 100;
  const bonuses = (function () {
    let content = {
      [FAST]: stats.filter((el) => el === FAST).length,
      [SLOW]: stats.filter((el) => el === SLOW).length,
      [ALIVE]: 3 - stats.filter((el) => el === WRONG).length,
    };

    return Object.entries(content).map((pair) => {
      return getBonus(pair[0], pair[1]);
    }).filter((el) => el !== null);
  }());

  const totalFinal = bonuses
      .reduce((accum, bonus) => {
        return accum + bonus.points;
      }, totalResult);

  return {
    totalResult,
    bonuses,
    totalFinal
  };
};

export const isWin = (stats) => {
  return stats.filter((el) => el === WRONG).length < 3;
};

const statsHashParams = [
  resultType.WRONG,   // 0
  resultType.SLOW,    // 1
  resultType.CORRECT, // 2
  resultType.FAST     // 3
];


export const statsHashCypher = (stats) => {
  return stats.map((el) => statsHashParams.indexOf(el)).join(``);
};

export const statsHashDecypher = (params) => {
  if (params.length !== initialState.stats.length) {
    throw new RangeError(`Amount of answers is not equal to amount of questions`);
  } else {
      return params.split(``).map((numb) => statsHashParams[Number(numb)]);
  }
};
