import AbstractView from "./view";

export class SpinningStar extends AbstractView {
  get template() {
    return `<div id="main" class="central__content">
              <div class="rolling-star">
                <h1 class="rolling-star__asterisk">*</h1>
              </div>
            </div>`;
  }
}
