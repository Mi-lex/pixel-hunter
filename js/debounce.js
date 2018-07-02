let debounceTimer;

const debounce = (action, delayTime) => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    action();
  }, delayTime);
};

export default debounce;
