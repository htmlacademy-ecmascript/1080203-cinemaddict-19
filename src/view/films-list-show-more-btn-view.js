import { createElement } from '../render.js';

function createFilmsListShowMoreBtnTemplate() {
  return '<button class="films-list__show-more">Show more</button>';
}

export default class FilmsListShowMoreBtnView {
  getTemplate() {
    return createFilmsListShowMoreBtnTemplate();
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
