import Observable from '../framework/observable.js';
import { FILMS_FILTER_HASHES } from '../const.js';

export default class FilmsFilterModel extends Observable {
  #currentFilter = FILMS_FILTER_HASHES.ALL;

  constructor() {
    super();
  }

  getCurrentFilter = () => this.#currentFilter;

  setCurrentFilter = (newFilterHash) => {
    this.#currentFilter = newFilterHash;

    this._notify();
  };
}
