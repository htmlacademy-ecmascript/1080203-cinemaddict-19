import ApiService from './framework/api-service.js';

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class FilmsApiService extends ApiService {
  get films() {
    return this._load({ url: 'movies' }) // todo Заменить на константу
      .then(ApiService.parseResponse);
  }

  async getFilmComments(filmId) {
    return this._load({ url: `comments/${filmId}` }) // todo Заменить на константу
      .then(ApiService.parseResponse);
  }

  async updateFilm(film) {
    const response = await this._load({
      url: `movies/${film.id}`, // todo Заменить на константу
      method: METHODS.PUT,
      body: JSON.stringify(this.#adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptToServer(film) {
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
    delete adaptedFilm.filmInfo.ageRating;
    delete adaptedFilm.filmInfo.alternativeTitle;
    delete adaptedFilm.filmInfo.totalRating;
    delete adaptedFilm.filmInfo.release.releaseCountry;
    delete adaptedFilm.userDetails;
    delete adaptedFilm.userDetails.alreadyWatched;
    delete adaptedFilm.userDetails.watchingDate;

    return adaptedFilm;
  }
}
