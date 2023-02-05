import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';
import { EMPTY_FILMS_LIST_MESSAGES, FILMS_FILTER_HASHES } from '../const.js';

function createFilmsListEmptyTemplate(message) {
  return `
    <section class="films">
      <section class="films-list">
        <h2 class="films-list__title">${message}</h2>
      </section>
    </section>
  `;
}

export default class FilmsListEmptyView extends AbstractView {
  #filmsFilterLinkHash = null;

  get template() {
    return createFilmsListEmptyTemplate(EMPTY_FILMS_LIST_MESSAGES[this.#filmsFilterLinkHash]);
  }

  init = ({ filmsListContainer, currentFilmFilter }) => {
    if (this.element) {
      this.removeElement();
    }

    this.#filmsFilterLinkHash = currentFilmFilter || FILMS_FILTER_HASHES.ALL;

    render(this, filmsListContainer);
  };
}
