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

const POINT_PER_ANSWER = 100;

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

/**
 * Builds the object that contains scores and bonuses informatin.
 * @param {array} stats - list of user's result
 * @param {number} lives - amount of lives that left in the end
 * @return {obj}
 */
export const getTableData = (stats, lives) => {
  // Each right answer gives some point
  const totalResult = stats.filter((el) => el !== `wrong`).length * POINT_PER_ANSWER;

  /**
   * Builds objects that contains "name of bonus": bonus amount, then
   * replace this object with array of objects. Each object in that array
   * represents iformation about bonus.
   @return {object} for detailed information look at getBonus function return.
   */
  const tableBonuses = (function () {
    let bonusMap = {
      [FAST]: stats.filter((el) => el === FAST).length,
      [SLOW]: stats.filter((el) => el === SLOW).length,
      [ALIVE]: lives,
    };

    return Object.entries(bonusMap).map((pair) => {
      return getBonus(pair[0], pair[1]); // pair[0] - bonus name, pair[1] - bonus amount
    }).filter((el) => el !== null);
  }());

  // Accumulate all bonuses points and points that were given for each answer
  const totalFinal = tableBonuses
      .reduce((accum, bonus) => {
        return accum + bonus.points;
      }, totalResult);

  return {
    totalResult,
    tableBonuses,
    totalFinal
  };
};
