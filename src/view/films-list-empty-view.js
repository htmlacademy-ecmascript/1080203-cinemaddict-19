import { createElement } from '../render.js';

function createFilmsListEmptyTemplate() {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>
  `;
}

export default class FilmsListEmptyView {
  #element = null;

  get template() {
    return createFilmsListEmptyTemplate();
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
