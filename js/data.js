const data = {};

data.gameContents = Object.freeze([
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        src: `http://placehold.it/468x458`,
        answer: `photo`
      },
      {
        src: `http://placehold.it/468x458`,
        answer: `paint`
      }
    ]
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [
      {
        src: `http://placehold.it/705x455`,
        answer: `paint`
      }
    ]
  },
  {
    task: `Найдите рисунок среди изображений`,
    options: {
      src: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`],  // change to set later
      answer: `http://placehold.it/304x455`
    }
  }
]);

export default data;
