import {gameContents, states} from "../data";
import headerTemplate from "./header";
import {statsTemplate} from "./stats";
import footerTemplate from "./footer";

export const gameContent = (content, state) => {
  const contentObj = content[state.gameNumb - 1];

  return contentObj.options.map((src, numb) => {
    const inputs = contentObj.hasNotInput ? `` :
      `<label class="game__answer game__answer--photo">
        <input name="question${numb + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question${numb + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;

    const contentTemplate =
    `<div class="game__option">
    <img src="${src}" width=100% height=100% alt="Option ${numb + 1}">
      ${inputs}
    </div>`;

    return contentTemplate;
  });
};

const gameTemplate = (content = gameContents, state = states.current) => {
  let contentType = ``;

  switch (state.gameNumb) {
    case 2:
      contentType = `game__content--wide`;
      break;
    case 3:
      contentType = `game__content--triple`;
      break;
  }

  const template =
    `${headerTemplate(state)}
    <div class="game">
      <p class="game__task">${content[state.gameNumb - 1].task}</p>
      <form class="game__content ${contentType}">
        ${gameContent(content, state)}
      </form>
      <div class="stats">
        <ul class="stats">
          ${statsTemplate(state)}
        </ul>
      </div>
    </div>
    ${footerTemplate}`;

  return template;
};

export default gameTemplate;
