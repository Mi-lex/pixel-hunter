import AbstractView from "../view";

export default class IntroView extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
              <div id="intro" class="intro">
                <h1 class="intro__asterisk">*</h1>
                <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
              </div>
            </div>`;
  }

  bind() {
    const starBtn = this._element.querySelector(`.intro__asterisk`);

    const onStarBtnClickHandler = (e) => {
      if (e.target.closest(`.intro__asterisk`)) {
        this.onStart();
      }
    };

    starBtn.addEventListener(`click`, onStarBtnClickHandler);
  }

  onStart() {

  }
}
