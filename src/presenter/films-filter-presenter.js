import FilmsFilterView from '../view/films-filter-view.js';
import { render } from '../framework/render.js';

export default class FilmsFilterPresenter {
  #filmsModel = null;
  #filmsFilterView = null;
  #filmsFilterModel = null;

  constructor({ filtersModel, filmsModel }) {
    this.#filmsModel = filmsModel;
    this.#filmsFilterModel = filtersModel;

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

  #filmsFilterClickHandler = (filterHash) => {
    this.#filmsFilterModel.setCurrentFilter(filterHash);
  };

  #changeFilmCountByControlButtonId = (controlButtonId) => {
    this.#filmsFilterView.changeFilmCountByControlButtonId(controlButtonId);
  };
}
