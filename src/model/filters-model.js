import Observable from '../framework/observable.js';

export default class FilmsFilterModel extends Observable {
  #currentFilter = 'all'; // Поменять all на константу

  constructor() {
    super();
  }

  getCurrentFilter = () => this.#currentFilter;

  // Пробовал использовать set filter, получал ошибку
  setCurrentFilter = (newFilterHash) => {
    this.#currentFilter = newFilterHash;

    this._notify();
  };
}
