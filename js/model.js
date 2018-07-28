export default class Model {
  get urlRead() {
    throw new Error(`Abstract method. You need to define method first`);
  }

  get urlWrite() {
    throw new Error(`Abstract method. You need to define method first`);
  }

  load() {
    return fetch(this.urlRead)
        .then((resp) => resp.json());
  }

  send(data) {
    const requestSettings = {
      method: `POST`,
      headers: {
        "Content-Type": `application/json`
      },
      body: JSON.stringify(data)
    };

    return fetch(this.urlWrite, requestSettings);
  }
}
