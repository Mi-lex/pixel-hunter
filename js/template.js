export default (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container;
};
