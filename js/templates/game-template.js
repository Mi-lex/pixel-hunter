import headerTemplate from "./header";
import footerTemplate from "./footer";

const gameTemplate = (data, content, state) => `${headerTemplate(state)}
<div class="game">
  <p class="game__task">${data.gameContents[state.gameNumb].task}</p>
  <form class="game__content">
    ${content(data, state)}
  </form>
  <div class="stats">
    <ul class="stats">
      ${state.gameResults.map((el) =>
        `<li class="stats__result stats__result--${el}"></li>`)
        .join(``)}
    </ul>
  </div>
</div>
${footerTemplate}`;

export default gameTemplate;
