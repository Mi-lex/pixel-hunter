const main = document.querySelector(`.central`),
      greeting = document.querySelector(`#greeting`).content.children,
      rules = document.querySelector(`#rules`).content.children,
      firstScreen = document.querySelector(`#game-1`).content.children,
      secondScreen = document.querySelector(`#game-2`).content.children,
      thirdScreen = document.querySelector(`#game-3`).content.children,
      screens = [greeting, rules, firstScreen, secondScreen, thirdScreen];

let currentScreen = 0;

const screenToggler = (screenNumb) => {
  if (screenNumb < 0) {
    currentScreen = 0;
    return
  } else if (screenNumb > screens.length - 1) {
      currentScreen = 0;
  }

  let fragment = document.createDocumentFragment();
  main.innerHTML = ``;

  Array.from(screens[screenNumb]).forEach((el) => {
    const cloneEl = el.cloneNode(true);
    fragment.appendChild(cloneEl);
  });

  main.appendChild(fragment);
};

screenToggler(currentScreen);

const onArrowKeysHandler = (e) => {
  if (e.altKey && e.keyCode === 39) {
    screenToggler(currentScreen += 1);
  } else if (e.altKey && e.keyCode === 37) {
      screenToggler(currentScreen += -1);
  }
};

document.body.addEventListener(`click`, function (e) {
  if (e.target.closest(`.greeting__continue`)) {
    screenToggler(currentScreen += 1);
  }

  if (e.target.closest(`.back`)) {
    screenToggler(currentScreen -= 1);
  }
});

document.addEventListener(`keydown`, onArrowKeysHandler);
