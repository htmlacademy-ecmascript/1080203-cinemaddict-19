import AbstractView from '../framework/view/abstract-view.js';
import {
  FILM_FILTER_TYPES_BY_HASH,
  ACTIVE_FILTER_ITEM_CLASS,
  USER_DETAILS_VALUES_BY_BTN_ID,
  FILM_FILTER_ELEMENTS,
  FILMS_FILTER_HASHES
} from '../const.js';
import {
  changeActiveLinkElementByClass,
  getHashFromLinkElement,
  getObjectKeyByValue
} from '../utils.js';

function createFilterTemplate() {
  return `
    <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active" data-element="${FILM_FILTER_ELEMENTS.LINK}">
          All movies
        </a>
        <a href="#watchlist" class="main-navigation__item" data-element="${FILM_FILTER_ELEMENTS.LINK}">
          Watchlist
          <span class="main-navigation__item-count" data-element="${FILM_FILTER_ELEMENTS.COUNTER}">
            0
          </span>
        </a>
        <a href="#history" class="main-navigation__item" data-element="${FILM_FILTER_ELEMENTS.LINK}">
          History
          <span class="main-navigation__item-count" data-element="${FILM_FILTER_ELEMENTS.COUNTER}">
            0
          </span>
        </a>
        <a href="#favorites" class="main-navigation__item" data-element="${FILM_FILTER_ELEMENTS.LINK}">
          Favorites
          <span class="main-navigation__item-count" data-element="${FILM_FILTER_ELEMENTS.COUNTER}">
            0
          </span>
        </a>
    </nav>
  `;
}

export default class FilmsFilterView extends AbstractView {
  #handleFilmsFilterClick = null;
  #filmsFilterPresenter = null;
  #films = null;

  constructor({ onFilmsFilterClick, filmsFilterPresenter }) {
    super();

    this.#handleFilmsFilterClick = onFilmsFilterClick;
    this.#filmsFilterPresenter = filmsFilterPresenter;

    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();

      switch (evt.target.dataset.element) {
        case FILM_FILTER_ELEMENTS.LINK:
          changeActiveLinkElementByClass(this.element, evt.target, ACTIVE_FILTER_ITEM_CLASS);

          this.#handleFilmsFilterClick(getHashFromLinkElement(evt.target));
          break;
        case FILM_FILTER_ELEMENTS.COUNTER:
          changeActiveLinkElementByClass(this.element, evt.target.parentElement, ACTIVE_FILTER_ITEM_CLASS);

          this.#handleFilmsFilterClick(getHashFromLinkElement(evt.target.parentElement));
          break;
      }
    });
  }

  get template() {
    return createFilterTemplate();
  }

  changeFilmCountByControlButtonId(controlButtonId) {
    const newCountFilmsByFilter = this.#countFilmsByFilter();
    const filterHash = getObjectKeyByValue(FILM_FILTER_TYPES_BY_HASH, USER_DETAILS_VALUES_BY_BTN_ID[controlButtonId]);
    const filterLink = Array.from(this.element.children).find((link) => link.href.includes(filterHash));

    filterLink.querySelector('span').innerText = newCountFilmsByFilter[filterHash];
  }

  #setFilmCountByHash(filmsCounts, key) {
    const filterLink = Array.from(this.element.children).find((link) => link.href.includes(key));

    filterLink.querySelector('span').innerText = filmsCounts[key];
  }

  insertFilmsCountsToFlter = () => {
    const filmsCounts = this.#countFilmsByFilter();

    for (const hash in filmsCounts) {
      if (hash === FILMS_FILTER_HASHES.ALL) {
        continue;
      }

      this.#setFilmCountByHash(filmsCounts, hash);
    }
  };

  #countFilmsByFilter = () => {
    this.#films = this.#filmsFilterPresenter.getFilms();

    return Object.keys(FILM_FILTER_TYPES_BY_HASH).reduce((acc, hash) => ({
      ...acc, [hash]: this.#films.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[hash]]).length
    }), {});
  };
}
