import { createElement } from '../render.js';

function createFilmsStatisticTemplate() {
  return `
    <section class="footer__statistics">
        <p>130 291 movies inside</p>
    </section>
  `;
}

export default class FilmsStatisticView {
  #element = null;

  get template() {
    return createFilmsStatisticTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
