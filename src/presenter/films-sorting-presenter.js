import FilmsSortingView from '../view/films-sorting-view.js';
import { render } from '../framework/render.js';

export default class FilmsSortingPresenter {
  init({ onFilmsSortingClick, mainElement }) {
    render(new FilmsSortingView({ onFilmsSortingClick }), mainElement);
  }
}
