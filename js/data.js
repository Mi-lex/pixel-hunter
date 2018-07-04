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
    options: [
      {
        src: `http://placehold.it/304x455`,
        answer: `photo`
      },
      {
        src: `http://placehold.it/304x455`,
        answer: `photo`
      },
      {
        src: `http://placehold.it/304x455`,
        answer: `paint`
      }
    ]
  }
]);

export default data;
