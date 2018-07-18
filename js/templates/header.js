const headerTemplate = (extraTemplate) => {
  const extraHeader = extraTemplate ? extraTemplate : ``;

  const commonTemplate = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${extraHeader}
  </header>`.trim();

  return commonTemplate;
};

export default headerTemplate;
