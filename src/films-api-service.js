import ApiService from './framework/api-service.js';
import { METHODS, API_URL } from './const.js';

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: API_URL.MOVIES })
      .then(ApiService.parseResponse);
  }

  async getFilmComments(filmId) {
    return this._load({ url: `${API_URL.COMMENTS}/${filmId}` })
      .then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `${API_URL.MOVIES}/${film.id}`,
      method: METHODS.PUT,
      body: this.#adaptFilmToServer(film),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptFilmToServer(film) {
    const adaptedFilm = {
      ...film,
      'film_info': {
        ...film.filmInfo,
        'age_rating': film.filmInfo.ageRating,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        'release': {
          ...film.filmInfo.release,
          'release_country': film.filmInfo.release.releaseCountry
        }
      },
      'user_details': {
        ...film.userDetails,
        'already_watched': film.userDetails.alreadyWatched,
        'watching_date': film.userDetails.watchingDate
      }
    };

    delete adaptedFilm.filmInfo;
    delete adaptedFilm['film_info'].ageRating;
    delete adaptedFilm['film_info'].alternativeTitle;
    delete adaptedFilm['film_info'].totalRating;
    delete adaptedFilm['film_info'].release.releaseCountry;
    delete adaptedFilm.userDetails;
    delete adaptedFilm['user_details'].alreadyWatched;
    delete adaptedFilm['user_details'].watchingDate;

    return JSON.stringify(adaptedFilm);
  }
}
