import { filmsMock } from '../mock/films-mock.js';
import { FILMS_COUNT, FILM_FILTER_TYPES_BY_HASH } from '../const.js';
import {
  copyArrayAndLimitLength,
  sortArrayByNestedObjectProperty,
  getDateObjectFromString
} from '../utils.js';

export default class FilmsModel {
  #films = null;
  #filteredFilmsMock = null;

  getFilms(filterName = 'all', sortingName = 'default') {
    if (FILM_FILTER_TYPES_BY_HASH[filterName]) {
      this.#filteredFilmsMock = filmsMock.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[filterName]]);
      this.#films = copyArrayAndLimitLength(this.#filteredFilmsMock, 0, FILMS_COUNT);
    } else {
      this.#films = copyArrayAndLimitLength(filmsMock, 0, FILMS_COUNT);
    }

    switch (sortingName) {
      case 'default':
        break;
      case 'date':
        sortArrayByNestedObjectProperty(this.#films, 'filmInfo.release.date', true, getDateObjectFromString);
        break;
      case 'rating':
        sortArrayByNestedObjectProperty(this.#films, 'filmInfo.totalRating', true);
        break;
    }

    return this.#films;
  }
}
