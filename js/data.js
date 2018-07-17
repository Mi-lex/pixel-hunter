export const gameContents = Object.freeze([
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    options: [`http://placehold.it/468x458`, `http://placehold.it/468x458`],
  },
  {
    task: `Угадай, фото или рисунок?`,
    options: [`http://placehold.it/705x455`]
  },
  {
    task: `Найдите рисунок среди изображений`,
    hasNotInput: true,
    options: [`http://placehold.it/304x455`, `http://placehold.it/304x455`, `http://placehold.it/304x455`]
  }
]);

export const optionElementParams = Object.freeze([
  {
    width: 468,
    height: 458
  },
  {
    width: 705,
    height: 455
  },
  {
    width: 304,
    height: 455
  }
]);

export const states = {};

states.initial = Object.freeze({
  gameNumb: 1,
  time: 30,
  lives: 3
});

export const answers = Object.freeze({
  paint: new Set([
    `ambootia.jpg`, `art book.jpg`, `blue-face.jpg`, `brush.jpg`, `coce.jpg`,
    `colours.webp`, `glass.jpg`, `exactitude.jpg`, `jones-street.jpg`,
    `painting kit.jpg`, `pureeka street.jpg`, `scrottish landscape.jpg`,
    `shiny sphere.jpg`, `shower.jpg`, `takeaway fish.jpg`, `water bag.jpg`,
    `wind screen.jpg`
  ]),
  photos: new Set([
    `cherries.jpg`, `cherry.jpg`, `darts.jpg`, `flame.jpg`, `girl.jpg`,
    `hatman.jpg`, `icecream.jpg`, `, lady bug.jpg`, `little candle.jpg`,
    `lonely island.webp`, `monk.jpg`, `pineapple.jpg`, `room.jpg`, `volcano.jpg`
  ])
});
