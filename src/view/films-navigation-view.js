import AbstractView from '../framework/view/abstract-view.js';
import {
  FILM_FILTER_TYPES_BY_HASH,
  ACTIVE_NAV_ITEM_CLASS,
  USER_DETAILS_VALUES_BY_BTN_ID
} from '../const.js';
import {
  isLinkElement,
  changeActiveLinkElementByClass,
  getHashFromLinkElement,
  getObjectKeyByValue
} from '../utils.js';

function createNavigationTemplate(countFilmsByNav) {
  return `
    <nav class="main-navigation">
        <a href="#all" class="main-navigation__item main-navigation__item--active">
          All movies
        </a>
        <a href="#watchlist" class="main-navigation__item">
          Watchlist <span class="main-navigation__item-count">${countFilmsByNav.watchlist}</span>
        </a>
        <a href="#history" class="main-navigation__item">
          History <span class="main-navigation__item-count">${countFilmsByNav.history}</span>
        </a>
        <a href="#favorites" class="main-navigation__item">
          Favorites <span class="main-navigation__item-count">${countFilmsByNav.favorites}</span>
        </a>
    </nav>
  `;
}

export default class FilmsNavigationView extends AbstractView {
  #handleFilmsNavClick = null;
  #films = null;

  constructor({ onFilmsNavClick, films }) {
    super();

    this.#handleFilmsNavClick = onFilmsNavClick;
    this.#films = films;

    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();

      if (isLinkElement(evt.target)) {
        changeActiveLinkElementByClass(this.element, evt.target, ACTIVE_NAV_ITEM_CLASS);

        this.#handleFilmsNavClick(getHashFromLinkElement(evt.target));
      }
    });
  }

  #countFilmsByNav() {
    return Object.keys(FILM_FILTER_TYPES_BY_HASH).reduce((acc, hash) => ({
      ...acc, [hash]: this.#films.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[hash]]).length
    }), {});
  }

  get template() {
    return createNavigationTemplate(this.#countFilmsByNav());
  }

  changeFilmCountByControlButtonId(controlButtonId) {
    const newCountFilmsByNav = this.#countFilmsByNav();
    const filterHash = getObjectKeyByValue(FILM_FILTER_TYPES_BY_HASH, USER_DETAILS_VALUES_BY_BTN_ID[controlButtonId]);
    const elem = Array.from(this.element.children).find((el) => el.href.includes(filterHash));
    elem.querySelector('span').innerText = newCountFilmsByNav[filterHash];
  }
}
