import FilmsSortingView from '../view/films-sorting-view.js';
import { render } from '../framework/render.js';

export default class FilmsSortingPresenter {
  #filmsSortingView = null;

  init({ onFilmsSortingClick, mainElement }) {
    this.#filmsSortingView = new FilmsSortingView({ onFilmsSortingClick });

    render(this.#filmsSortingView, mainElement);
  }

  resetActiveSortToDefault = () => {
    this.#filmsSortingView.resetActiveSortToDefault();
  };
}
