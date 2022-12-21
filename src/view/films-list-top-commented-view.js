import { createElement } from '../render.js';

function createFilmsListTopCommentedTemplate() {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>
  `;
}

export default class FilmsListTopCommentedView {
  #element = null;

  get template() {
    return createFilmsListTopCommentedTemplate();
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
