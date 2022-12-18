import {getRandomFilm} from '../mock/films-mock.js';
import {FILMS_COUNT} from '../const.js';

export default class FilmsModel {
  films = Array.from({length: FILMS_COUNT}, getRandomFilm);

  getFilms() {
    return this.films;
  }
}
