import { createElement } from '../render.js';

function createFilmsListShowMoreBtnTemplate() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class FilmsListShowMoreBtnView {
  #element = null;

  get template() {
    return createFilmsListShowMoreBtnTemplate();
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
