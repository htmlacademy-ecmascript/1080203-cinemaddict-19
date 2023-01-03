import AbstractView from '../framework/view/abstract-view.js';

function createFilmsListShowMoreBtnTemplate() {
  return '<button class="films-list__show-more">Show more films</button>';
}

export default class FilmsListShowMoreBtnView extends AbstractView {
  get template() {
    return createFilmsListShowMoreBtnTemplate();
  }
}
