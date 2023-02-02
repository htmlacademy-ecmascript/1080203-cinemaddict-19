import AbstractView from '../framework/view/abstract-view.js';
import { ACTIVE_SORTING_ITEM_CLASS } from '../const.js';
import {
  changeActiveLinkElementByClass,
  getHashFromLinkElement,
  removeClassFromChildrenElements
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

export default class FilmsSortingView extends AbstractView {
  #handleFilmsSortingClick = null;

  constructor({ onFilmsSortingClick }) {
    super();

    this.#handleFilmsSortingClick = onFilmsSortingClick;

    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (evt.target.tagName === 'A') {
        changeActiveLinkElementByClass(this.element, evt.target, ACTIVE_SORTING_ITEM_CLASS);

        this.#handleFilmsSortingClick(getHashFromLinkElement(evt.target));
      }
    });
  }

  get template() {
    return createSortingTemplate();
  }

  resetActiveSortToDefault = () => {
    removeClassFromChildrenElements(this.element, ACTIVE_SORTING_ITEM_CLASS);

    this.element.querySelector('[href="#default"]').classList.add(ACTIVE_SORTING_ITEM_CLASS); // Добавить константу
  };
}
