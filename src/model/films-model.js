import Observable from '../framework/observable.js';
import { filmsMock } from '../mock/films-mock.js';
import {
  FILMS_COUNT,
  FILM_FILTER_TYPES_BY_HASH,
  USER_DETAILS_VALUES_BY_BTN_ID,
  COMMENTS_ACTIONS,
  FILMS_SORTING_HASHES,
  FILMS_FILTER_HASHES
} from '../const.js';
import {
  copyArrayAndLimitLength,
  sortArrayByNestedObjectProperty,
  getDateObjectFromString
} from '../utils.js';

export default class FilmsModel extends Observable {
  #films = null;
  #filteredAndSortedFilms = null;

  constructor() {
    super();
  }

  getFilms = (filterName = FILMS_FILTER_HASHES.ALL, sortingName = FILMS_SORTING_HASHES.DEFAULT) => {
    this.#films = copyArrayAndLimitLength(filmsMock, 0, FILMS_COUNT);

    if (FILM_FILTER_TYPES_BY_HASH[filterName]) {
      this.#filteredAndSortedFilms = this.#films.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[filterName]]);
    } else {
      this.#filteredAndSortedFilms = this.#films;
    }

    switch (sortingName) {
      case FILMS_SORTING_HASHES.DEFAULT:
        break;
      case FILMS_SORTING_HASHES.DATE:
        sortArrayByNestedObjectProperty(this.#filteredAndSortedFilms, 'filmInfo.release.date', true, getDateObjectFromString);
        break;
      case FILMS_SORTING_HASHES.RATING:
        sortArrayByNestedObjectProperty(this.#filteredAndSortedFilms, 'filmInfo.totalRating', true);
        break;
    }

    return this.#filteredAndSortedFilms;
  };

  changeControlButtonsActivity = (changedUserDetailId, filmId) => {
    const key = USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId];
    const currentFilm = this.#films.find((film) => (film.id === filmId));

    currentFilm.userDetails[key] = !currentFilm.userDetails[key];

    this._notify(changedUserDetailId);
  };

  getFilmById = (filmId) => this.#films.find((film) => (film.id === filmId));

  updateFilm = (action, commentData) => {
    switch (action) {
      case COMMENTS_ACTIONS.CREATE:
        this.#addFilmComment(commentData);
        break;
      case COMMENTS_ACTIONS.DELETE:
        this.#deleteFilmComment(commentData);
        break;
    }
  };

  #addFilmComment = ({ filmId, commentId }) => {
    this.#films.find((film) => {
      if (film.id === filmId) {
        film.comments.push(commentId);
      }
    });
  };

  #deleteFilmComment = ({ filmId, commentId }) => {
    this.#films.find((film) => {
      if (filmId === film.id) {
        film.comments.find((filmCommentId, index, array) => {
          if (filmCommentId === commentId) {
            array.splice(index, 1);
          }
        });
      }
    });
  };
}

