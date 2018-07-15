import {optionElementParams, states} from "./data";

export const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container;
};

export const renderScreen = (element) => {
  const main = document.querySelector(`.central`);

  main.innerHTML = ``;
  main.appendChild(element);
};

export const debounce = {};

debounce.start = function (action, delayTime) {
  clearTimeout(this.timer);

  this.timer = setTimeout(() => {
    action();
  }, delayTime);
};
