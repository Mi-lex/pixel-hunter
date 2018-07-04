import data from "../data";
import headerTemplate from "./header";
import footerTemplate from "./footer";

const gameTemplate = (content) => `${headerTemplate(data.currentState)}
<div class="game">
  <p class="game__task">${data.gameContents[data.currentState.gameNumb - 1].task}</p>
  <form class="game__content">
    ${content(data)}
  </form>
  <div class="stats">
    <ul class="stats">
      ${data.currentState.gameResults.map((el) =>
        `<li class="stats__result stats__result--${el}"></li>`)
        .join(``)}
    </ul>
  </div>
</div>
${footerTemplate}`;

export default gameTemplate;
