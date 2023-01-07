import AbstractView from '../framework/view/abstract-view.js';
import {
  isLinkElement,
  changeActiveLinkElementByClass,
  getHashFromLinkElement
} from '../utils.js';

function createSortingTemplate() {
  return `
    <ul class="sort">
        <li><a href="#default" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#date" class="sort__button">Sort by date</a></li>
        <li><a href="#rating" class="sort__button">Sort by rating</a></li>
    </ul>
  `;
}

export default class SortingView extends AbstractView {
  #handleFilmsSortingClick = null;

  constructor({ onFilmsSortingClick }) {
    super();

    this.#handleFilmsSortingClick = onFilmsSortingClick;

    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (isLinkElement(evt.target)) {
        changeActiveLinkElementByClass(this.element, evt.target, 'sort__button--active');

        this.#handleFilmsSortingClick(getHashFromLinkElement(evt.target));
      }
    });
  }

  get template() {
    return createSortingTemplate();
  }
}
