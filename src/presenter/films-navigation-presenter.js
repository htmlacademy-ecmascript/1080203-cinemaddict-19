import FilmsNavigationView from '../view/films-navigation-view.js';
import { render } from '../framework/render.js';

export default class FilmsNavigationPresenter {
  #filmsNavigationView = null;

  init({ onFilmsNavClick, films, mainElement }) {
    this.#filmsNavigationView = new FilmsNavigationView({ onFilmsNavClick, films });
    render(this.#filmsNavigationView, mainElement);
  }

  changeFilmCountByControlButtonId(controlButtonId) {
    this.#filmsNavigationView.changeFilmCountByControlButtonId(controlButtonId);
  }
}
