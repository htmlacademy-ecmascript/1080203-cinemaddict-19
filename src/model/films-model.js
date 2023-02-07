import Observable from '../framework/observable.js';
// import { filmsMock } from '../mock/films-mock.js'; // todo Удалить вместе с файлом
import {
  // FILMS_COUNT, // todo Удалить и в const тоже
  FILM_FILTER_TYPES_BY_HASH,
  USER_DETAILS_VALUES_BY_BTN_ID,
  COMMENTS_ACTIONS,
  FILMS_SORTING_HASHES,
  FILMS_FILTER_HASHES,
  FILM_MODEL_ACTIONS
} from '../const.js';
import {
  // copyArrayAndLimitLength, // todo Удалить вместе с функцией в utils
  sortArrayByNestedObjectProperty,
  getDateObjectFromString
} from '../utils.js';

export default class FilmsModel extends Observable {
  #films = [];
  #filteredAndSortedFilms = null;
  #filmsApiService = null;

  constructor({ filmsApiService }) {
    super();

    this.#filmsApiService = filmsApiService;
  }

  async init() {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptFilmToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(FILM_MODEL_ACTIONS.INIT, this.#films);
  }

  getFilms = (filterName = FILMS_FILTER_HASHES.ALL, sortingName = FILMS_SORTING_HASHES.DEFAULT) => {
    // this.#films = copyArrayAndLimitLength(filmsMock, 0, FILMS_COUNT); // todo Удалить вместе с функцией в utils

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

    this._notify(FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS, changedUserDetailId);
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

  #adaptFilmToClient(film) {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...film['film_info'],
        ageRating: film['film_info']['age_rating'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        release: {
          ...film['film_info']['release'],
          releaseCountry: film['film_info']['release']['release_country']
        }
      },
      userDetails: {
        ...film['user_details'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date']
      }
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo.release['release_country'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];

    return adaptedFilm;
  }
}

