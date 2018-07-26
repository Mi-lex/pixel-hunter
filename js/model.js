export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. You need to define method first`);
  }

  load() {
    return fetch(this.urlRead)
        .then((resp) => resp.json());
  }
}
