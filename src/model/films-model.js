import { filmsMock } from '../mock/films-mock.js';
import {
  FILMS_COUNT,
  FILM_FILTER_TYPES_BY_HASH,
  USER_DETAILS_VALUES_BY_BTN_ID
} from '../const.js';
import {
  copyArrayAndLimitLength,
  sortArrayByNestedObjectProperty,
  getDateObjectFromString
} from '../utils.js';

export default class FilmsModel {
  #films = null;
  #filteredAndSortedFilms = null;

  getFilms(filterName = 'all', sortingName = 'default') {
    this.#films = copyArrayAndLimitLength(filmsMock, 0, FILMS_COUNT);

    if (FILM_FILTER_TYPES_BY_HASH[filterName]) {
      this.#filteredAndSortedFilms = this.#films.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[filterName]]);
    } else {
      this.#filteredAndSortedFilms = this.#films;
    }

    switch (sortingName) {
      case 'default':
        break;
      case 'date':
        sortArrayByNestedObjectProperty(this.#filteredAndSortedFilms, 'filmInfo.release.date', true, getDateObjectFromString);
        break;
      case 'rating':
        sortArrayByNestedObjectProperty(this.#filteredAndSortedFilms, 'filmInfo.totalRating', true);
        break;
    }

    return this.#filteredAndSortedFilms;
  }

  changeControlButtonsActivity(changedUserDetailId, filmId) {
    const key = USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId];
    const currentFilm = this.#films.find((film) => (film.id === filmId));

    currentFilm.userDetails[key] = !currentFilm.userDetails[key];
  }

  getFilmById(filmId) {
    return this.#films.find((film) => (film.id === filmId));
  }
}
