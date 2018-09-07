import AbstractView from "../view";
import {getTableData} from "../data/stats-data";
import {drawStats} from "../game/game-view";
import headerTemplate from "../templates/header";

export default class StatsrView extends AbstractView {
  constructor(resultTable) {
    super();
    this.resultTable = resultTable.reverse();
  }

  makeStatsTemplate(stats) {
    return `<ul class="stats">
              ${drawStats(stats)}
            </ul>`;
  }

  get template() {
    let currentGameTitle;
    const resultsTemplate = this.resultTable.map((resultObj, numb) => {
      const isWin = resultObj.lives > 0;

      if (numb === 0 && isWin) {
        currentGameTitle = true;
      }

      let resultContent;

      if (isWin) {
        const {totalResult, tableBonuses, totalFinal} = getTableData(resultObj.stats, resultObj.lives);
        resultContent =
          `<table class="result__table">
            <tr>
              <td class="result__number">${numb + 1}.</td>
              <td colspan="2">${this.makeStatsTemplate(resultObj.stats)}</td>
              <td class="result__points">×&nbsp;100</td>
              <td class="result__total">${totalResult}</td>
            </tr>
            ${tableBonuses.map((bonus) =>
            `<tr>
              <td></td>
              <td class="result__extra">${bonus.title}:</td>
              <td class="result__extra">${bonus.amount}&nbsp;<span class="stats__result stats__result--${bonus.classTitle}"></span></td>
              <td class="result__points">×&nbsp;50</td>
              <td class="result__total">${bonus.points}</td>
            </tr>`)}
            <tr>
              <td colspan="5" class="result__total  result__total--final">${totalFinal}</td>
            </tr>
          </table>`;
      } else {
        resultContent =
          `<table class="result__table">
            <tr>
              <td class="result__number">${numb + 1}.</td>
              <td></td>
              <td class="result__total">${this.makeStatsTemplate(resultObj.stats)}</td>
              <td class="result__total  result__total--final">fail</td>
            </tr>
          </table>`;
      }

      return resultContent;
    }).join(``);

    return `${headerTemplate()}
            <div class="result">
              ${currentGameTitle ? `<h1>Победа!</h1>` : ``}
              ${resultsTemplate}
            </div>`.trim();
  }

  bind() {
    const backElement = this._element.querySelector(`.header__back`);

    backElement.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {

  }
}
