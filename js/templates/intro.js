import getElementFromTemplate from "./template";
import greetingFunction from "./greeting";
import renderScreen from "../render";
import footerTemplate from "./footer";

const introTemplate = `<div id="main" class="central__content">
  <div id="intro" class="intro">
    <h1 class="intro__asterisk">*</h1>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </div>
</div>
${footerTemplate}`;

const introFunction = () => {
  const introElement = getElementFromTemplate(introTemplate),
        starBtn = introElement.querySelector(`.intro__asterisk`);

  const onStarBtnClickHandler = (e) => {
    if (e.target.closest(`.intro__asterisk`)) {
      greetingFunction();
    }
  };

  starBtn.addEventListener(`click`, onStarBtnClickHandler);
  renderScreen(introElement);
};

export default introFunction;
