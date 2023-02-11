import Observable from '../framework/observable.js';
import {
  FILM_FILTER_TYPES_BY_HASH,
  USER_DETAILS_VALUES_BY_BTN_ID,
  FILMS_SORTING_HASHES,
  FILMS_FILTER_HASHES,
  FILM_MODEL_ACTIONS
} from '../const.js';
import {
  sortArrayByNestedObjectProperty,
  getDateObjectFromString
} from '../utils.js';

export default class FilmsModel extends Observable {
  #films = [];
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

    this._notify(FILM_MODEL_ACTIONS.INIT, { films: this.#films });
  }

  getFilms = (filterName = FILMS_FILTER_HASHES.ALL, sortingName = FILMS_SORTING_HASHES.DEFAULT) => {
    let filteredAndSortedFilms = [...this.#films];

    if (FILM_FILTER_TYPES_BY_HASH[filterName]) {
      filteredAndSortedFilms = filteredAndSortedFilms.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[filterName]]);
    }

    switch (sortingName) {
      case FILMS_SORTING_HASHES.DEFAULT:
        break;
      case FILMS_SORTING_HASHES.DATE:
        sortArrayByNestedObjectProperty(filteredAndSortedFilms, 'filmInfo.release.date', true, getDateObjectFromString);
        break;
      case FILMS_SORTING_HASHES.RATING:
        sortArrayByNestedObjectProperty(filteredAndSortedFilms, 'filmInfo.totalRating', true);
        break;
    }

    return filteredAndSortedFilms;
  };

  async changeControlButtonsActivity(changedUserDetailId, film, filmCard) {
    const key = USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId];
    let response = null;

    film.userDetails[key] = !film.userDetails[key];

    try {
      response = this.#adaptFilmToClient(await this.#filmsApiService.updateFilm(film));
    } catch(err) {
      // Error
    }

    this._notify(FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS, { controlButtonId: changedUserDetailId, response, filmCard });
  }

  updateFilmsList = async () => {
    try {
      const films = await this.#filmsApiService.films;
      this.#films = films.map(this.#adaptFilmToClient);
    } catch(err) {
      this.#films = [];
    }

    this._notify(FILM_MODEL_ACTIONS.UPDATE, { films: this.#films });
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

