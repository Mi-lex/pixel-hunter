import AbstractView from "../view";
import headerTemplate from "../templates/header";
import {debounce} from "../utilities";

export default class RulesView extends AbstractView {
  get template() {
    return `${headerTemplate()}
            <div class="rules">
              <h1 class="rules__title">Правила</h1>
              <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
                src="img/photo_icon.png" width="16" height="16"> или рисунок <img
                src="img/paint_icon.png" width="16" height="16" alt="">.<br>
                Фотографиями или рисунками могут быть оба изображения.<br>
                На каждую попытку отводится 30 секунд.<br>
                Ошибиться можно не более 3 раз.<br>
                <br>
                Готовы?
              </p>
              <form class="rules__form">
                <input class="rules__input" type="text" placeholder="Ваше Имя" 
                  value="${localStorage.getItem(`name`) || ``}">
                <button class="rules__button continue" 
                  type="submit" ${(localStorage.getItem(`name`)) ? `` : `disabled`}>
                  Go!
                </button>
              </form>
            </div>`;
  }

  bind() {
    const form = this._element.querySelector(`.rules__form`);
    const userNameInput = form.querySelector(`.rules__input`);
    const submitBtn = form.querySelector(`.rules__button`);
    const backElement = this._element.querySelector(`.header__back`);

    const btnUpdate = () => {
      submitBtn.disabled = !(userNameInput.value.length > 1);
    };

    userNameInput.addEventListener(`input`, () => {
      debounce.start(btnUpdate, 500);
    });

    form.addEventListener(`submit`, () => {
      const name = userNameInput.value;
      this.onUserNameSubmit(name);
    });

    backElement.addEventListener(`click`, () => {
      this.onBack();
    });
  }

  onBack() {

  }

  onUserNameSubmit(name) {
    return name;
  }
}
