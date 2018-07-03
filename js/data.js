const data = {};

data.initialState = Object.freeze({
    gameNumb: `game-1`,
    time: `NN`,
    lives: 3,
    gameResults: new Array(10).fill(`unknown`)
});

data.gameContents = Object.freeze({
  "game-1": {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      `http://placehold.it/468x458`,
      `http://placehold.it/468x458`
    ]
  },
  "game-2": {
    task: `Угадай, фото или рисунок?`,
    options: `http://placehold.it/705x455`
  },
  "game-3": {
    task: `Найдите рисунок среди изображений`,
    options: [
      `http://placehold.it/304x455`,
      `http://placehold.it/304x455`,
      `http://placehold.it/304x455`
    ]
  }
});

export default data;
