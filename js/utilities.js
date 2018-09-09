export const getElementFromTemplate = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container;
};

export const changeView = (view) => {
  const main = document.querySelector(`.central`);

  main.innerHTML = ``;
  main.appendChild(view.element);
};

export const debounce = {};

debounce.start = function (action, delayTime) {
  clearTimeout(this.timer);

  this.timer = setTimeout(() => {
    action();
  }, delayTime);
};

export const imageLoader = (url) => {
  return new Promise((resolve, reject) => {
    let timeOut = null;
    const img = new Image();

    img.onload = function () {
      clearTimeout(timeOut);

      // Put natural size of loaded image into the object
      const imageNaturalSizes = {
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight
      };

      resolve(imageNaturalSizes);
    };

    img.onerror = function () {
      clearTimeout(timeOut);
      reject();
      throw new Error(`Downloading error!`);
    };

    timeOut = setTimeout(function () {
      reject();
      throw new Error(`Time out error!`);
    }, 40000);

    img.src = url;
  });
};
