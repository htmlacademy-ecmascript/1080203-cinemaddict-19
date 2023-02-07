import FilmsFilterView from '../view/films-filter-view.js';
import { render } from '../framework/render.js';
import { FILM_MODEL_ACTIONS } from '../const.js';

export default class FilmsFilterPresenter {
  #filmsModel = null;
  #filmsFilterView = null;
  #filmsFilterModel = null;

  constructor({ filtersModel, filmsModel }) {
    this.#filmsModel = filmsModel;
    this.#filmsFilterModel = filtersModel;

    this.#filmsModel.addObserver(this.#setFilmsCountsToFlter);
    this.#filmsModel.addObserver(this.#changeFilmCountByControlButtonId);
  }

  init({ mainElement, filmsFilterPresenter }) {
    this.#filmsFilterView = new FilmsFilterView({
      onFilmsFilterClick: this.#filmsFilterClickHandler,
      filmsFilterPresenter
    });

    render(this.#filmsFilterView, mainElement);
  }

  getFilms() {
    return this.#filmsModel.getFilms();
  }

  #setFilmsCountsToFlter = (action) => {
    switch (action) {
      case FILM_MODEL_ACTIONS.INIT:
        this.#filmsFilterView.insertFilmsCountsToFlter();
        break;
    }
  };

  #changeFilmCountByControlButtonId = (action, controlButtonId) => {
    switch (action) {
      case FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS:
        this.#filmsFilterView.changeFilmCountByControlButtonId(controlButtonId);
        break;
    }
  };

  #filmsFilterClickHandler = (filterHash) => {
    this.#filmsFilterModel.setCurrentFilter(filterHash);
  };
}
