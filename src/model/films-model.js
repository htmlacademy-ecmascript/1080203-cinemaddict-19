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
    const currentFilm = this.#films.find((film) => (film.id === filmId));

    // Я получил ID фильма и ID кнопки, теперь мне нужно изменить данные в массиве фильмов
    // Для этого я хочу воспользоваться короткой конструкцией userDetailsValue = !userDetailsValue
    // Но она не работает

    // Почему вот так не работает
    // let userDetailsValue = currentFilm.userDetails[USER_DETAILS_VALUES_BY_BTN_ID[userDetailsKey]];
    // userDetailsValue = !userDetailsValue;

    // А вот так работает
    currentFilm.userDetails[USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId]] = !currentFilm.userDetails[USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId]]; // Как сделать эту запись короче?
  }

  getFilmById(filmId) {
    return this.#films.find((film) => (film.id === filmId));
  }
}
