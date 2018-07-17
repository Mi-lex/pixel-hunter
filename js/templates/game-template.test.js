import chai from "chai";
import gameTemplate from "./game-template";
import {gameContents, states} from "../data";
const should = chai.should();

const game1FakeState = Object.assign({}, states.initial, {
  gameResults: new Array(10).fill(`unknown`)
});

const game2FakeState = Object.assign({}, game1FakeState, {
  gameNumb: 2,
});

const game3FakeState = Object.assign({}, game1FakeState, {
  gameNumb: 3,
});


describe(`Game template`, function () {
  it(`should return string in case of game 1`, function () {
    gameTemplate(gameContents, game1FakeState).should.be.a(`string`);
  });

  it(`should return string in case of game 2`, function () {
    gameTemplate(gameContents, game2FakeState).should.be.a(`string`);
  });

  it(`should return string in case of game 3`, function () {
    gameTemplate(gameContents, game3FakeState).should.be.a(`string`);
  });
});
