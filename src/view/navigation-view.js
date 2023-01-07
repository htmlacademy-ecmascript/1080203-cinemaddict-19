import AbstractView from '../framework/view/abstract-view.js';
import { FILM_FILTER_TYPES_BY_HASH } from '../const.js';
import {
  isLinkElement,
  changeActiveLinkElementByClass,
  getHashFromLinkElement
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

export default class NavigationView extends AbstractView {
  #handleFilmsNavClick = null;
  #films = null;
  #filmsCounts = {};

  constructor({ onFilmsNavClick, films }) {
    super();

    this.#handleFilmsNavClick = onFilmsNavClick;
    this.#films = films;

    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (isLinkElement(evt.target)) {
        changeActiveLinkElementByClass(this.element, evt.target, 'main-navigation__item--active');

        this.#handleFilmsNavClick(getHashFromLinkElement(evt.target));
      }
    });
  }

  // Правильно ли, что я считаю количество фильмов по каждому фильтру во view?
  #countFilmsByNav() {
    Object.entries(FILM_FILTER_TYPES_BY_HASH).forEach((navHash) => {
      this.#filmsCounts[navHash[0]] = this.#films.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[navHash[0]]]).length;
    });

    return this.#filmsCounts;
  }

  get template() {
    return createNavigationTemplate(this.#countFilmsByNav());
  }
}
