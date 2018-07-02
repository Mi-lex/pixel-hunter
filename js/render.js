const main = document.querySelector(`.central`);

export default (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
