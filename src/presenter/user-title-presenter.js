import UserTitleView from '../view/user-title-view.js';
import { FILM_FILTER_TYPES_BY_HASH, FILM_MODEL_ACTIONS } from '../const.js';

export default class UserTitlePresenter {
  #headerElement = null;
  #filmsModel = null;
  #userTitleView = new UserTitleView();

  constructor({ headerElement, filmsModel }) {
    this.#headerElement = headerElement;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#changeUserTitle);
  }

  #changeUserTitle = (action, payload) => {
    switch (action) {
      case FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS:
        this.#userTitleView.changeUserTitle(this.#getCountWatchedFilms(payload.films));
        break;
    }
  };

  init = async () => {
    const watchedFilmsCount = this.#getCountWatchedFilms(await this.#filmsModel.films());

    this.#userTitleView.render({ watchedFilmsCount, headerElement: this.#headerElement });
  };

  #getCountWatchedFilms = (films) => films.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH.history]).length;
}
