import { filmsMock } from '../mock/films-mock.js';
import { FILMS_COUNT, FILM_FILTER_TYPES_BY_HASH } from '../const.js';

export default class FilmsModel {
  #films = null;
  #filteredFilmsMock = null;

  getFilms(filterName = 'all', sortingName = 'default') {
    // Здесь фильтруется через условие
    if (FILM_FILTER_TYPES_BY_HASH[filterName]) {
      this.#filteredFilmsMock = filmsMock.filter((film) => film.userDetails[FILM_FILTER_TYPES_BY_HASH[filterName]]);
      this.#films = this.#filteredFilmsMock.slice(0, FILMS_COUNT + 1);
    } else {
      this.#films = filmsMock;
    }

    // А сортируется через switch
    switch (sortingName) {
      case 'default':
        this.#films.sort((a, b) => a.id - b.id);
        break;
      case 'date':
        this.#films.sort((a, b) => {
          a = new Date(a.filmInfo.release.date);
          b = new Date(b.filmInfo.release.date);
          return b - a;
        });
        break;
      case 'rating':
        this.#films.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
    }

    // Надо ли приводить к единому способу и сортировку и фильтрацию?

    return this.#films;
  }
}
