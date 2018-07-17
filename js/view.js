import {getElementFromTemplate} from "./utilities";

export default class AbstractView {
  bind() {

  }

  render() {
    return getElementFromTemplate(this.template);
  }

  get template() {
    throw new Error(`You have to specify your template`);
  }

  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }
}
