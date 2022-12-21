import { createElement } from '../render.js';

function createFilmsStatisticTemplate() {
  return `
    <section class="footer__statistics">
        <p>130 291 movies inside</p>
    </section>
  `;
}

export default class FilmsStatisticView {
  getTemplate() {
    return createFilmsStatisticTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
