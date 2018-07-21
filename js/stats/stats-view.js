import AbstractView from "../view";
import {isWin, getTableData} from "../data/data";
import {drawStats} from "../game/level-view";
import headerTemplate from "../templates/header";
import footerTemplate from "../templates/footer";

export default class StatsrView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.win = isWin(this.state);
  }

  get template() {
    const statsTemplate =
      `<ul class="stats">
        ${drawStats(this.state)}
      </ul>`;
    let pageContent;

    if (this.win) {
      const {totalResult, bonuses, totalFinal} = getTableData(this.state);
      pageContent =
        `<h1>Победа!</h1>
        <table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td colspan="2">${statsTemplate}</td>
            <td class="result__points">×&nbsp;100</td>
            <td class="result__total">${totalResult}</td>
          </tr>
          ${bonuses.map((bonus) =>
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
        pageContent =
        `<table class="result__table">
          <tr>
            <td class="result__number">1.</td>
            <td></td>
            <td class="result__total">${statsTemplate}</td>
            <td class="result__total  result__total--final">fail</td>
          </tr>
        </table>`
    }

    return `${headerTemplate()}
            <div class="result">
            ${pageContent}
            </div>
            ${footerTemplate}`;
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
