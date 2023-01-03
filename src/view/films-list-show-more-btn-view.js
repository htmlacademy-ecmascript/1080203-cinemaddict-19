import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListShowMoreBtnTemplate() {
  return '<button class="films-list__show-more">Show more films</button>';
}

export default class FilmsListShowMoreBtnView extends AbstractView {
  #handleFlmsListShowMoreBtnClick = null;

  constructor({ onFlmsListShowMoreBtnClick }) {
    super();

    this.#handleFlmsListShowMoreBtnClick = onFlmsListShowMoreBtnClick;

    this.element.addEventListener('click', this.#handleFlmsListShowMoreBtnClick);
  }

  get template() {
    return createFilmsListShowMoreBtnTemplate();
  }
}
