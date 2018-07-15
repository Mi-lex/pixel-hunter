import {renderScreen, getElementFromTemplate} from "../utilities";
import {states} from "../data";
import headerTemplate from "./header";
import footerTemplate from "./footer";

export const statsTemplate = (state) =>
  states.current.gameResults
      .map((el) =>
        `<li class="stats__result stats__result--${el}"></li>`)
      .join(``);

export const statsFunction = () => {
  const gameResultTitle = statsScreenTemplate.lives ? `Победа!` : `Поражение!`;
  let
    totalResult = ``,
    tableContent = [],
    totalFinal = `FAIL`;

  if (gameResultTitle === `Победа!`) {
    totalResult = states.current.gameResults.filter((el) => el !== `wrong`).length * 100;

    tableContent = (function () {
      const contentArr = [],
        fastAnswers = states.current.gameResults.filter((el) => el === `fast`).length,
        slowAnswers = states.current.gameResults.filter((el) => el === `slow`).length,
        lives = states.current.lives;

      if (fastAnswers) {
        contentArr.push({
          title: `Бонус за скорость`,
          engTitle: `fast`,
          amount: fastAnswers,
          bonusAmount: fastAnswers * 50
        });
      }

      if (lives) {
        contentArr.push({
          title: `Бонус за жизни`,
          engTitle: `alive`,
          amount: lives,
          bonusAmount: lives * 50
        });
      }

      if (slowAnswers) {
        contentArr.push({
          title: `Штраф за медлительность`,
          engTitle: `slow`,
          amount: slowAnswers,
          bonusAmount: -1 * slowAnswers * 50
        });
      }

      return contentArr;
    }());

    totalFinal = tableContent.reduce((accum, el) => {
      return accum + el.bonusAmount;
    }, totalResult);
  }

  const statsScreenTemplate = `
  ${headerTemplate()}
  <div class="result">
    <h1>${gameResultTitle}</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          <ul class="stats">
            ${statsTemplate(states.current)}
          </ul>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${totalResult}</td>
      </tr>
      ${tableContent.map((bonus) => `<tr>
          <td></td>
          <td class="result__extra">${bonus.title}:</td>
          <td class="result__extra">${bonus.amount}&nbsp;<span class="stats__result stats__result--${bonus.engTitle}"></span></td>
          <td class="result__points">×&nbsp;50</td>
          <td class="result__total">${bonus.bonusAmount}</td>
        </tr>`)}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalFinal}</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">2.</td>
        <td>
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--wrong"></li>
          </ul>
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
    <table class="result__table">
      <tr>
        <td class="result__number">3.</td>
        <td colspan="2">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--unknown"></li>
          </ul>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>
    </table>
  </div>
  ${footerTemplate}`;

  const statsElement = getElementFromTemplate(statsScreenTemplate);
  renderScreen(statsElement);
};
