import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../framework/render.js';
import { isKeydownNotEscapeKey } from '../utils.js';

export default class FilmDetailsPopupPresenter {
  #filmDetailsPopup = null;
  #pageBody = document.querySelector('body');
  #commentsModel = null;
  #filmComments = [];
  #controlButtonsClickHandler = null;

  constructor({ commentsModel, onControlButtonsClick }) {
    this.#commentsModel = commentsModel;
    this.#controlButtonsClickHandler = onControlButtonsClick;
  }

  init(film, filmCardButtonsElement) {
    if (this.#filmDetailsPopup) {
      this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
    }

    if (this.#filmComments.length) {
      this.#filmComments.length = 0;
    }

    this.#filmDetailsPopup = new FilmDetailsPopupView({
      filmDetails: film,
      filmComments: this.#getCommentsByIds(this.#commentsModel.comments, film.comments),
      onCloseFilmDetailsPopup: (evt) => {
        this.#handleCloseFilmDetailsPopup(evt);
      },
      onControlButtonsClick: this.#controlButtonsClickHandler,
      filmCardButtonsElement
    });

    render(this.#filmDetailsPopup, this.#pageBody);

    document.addEventListener('keydown', this.#handleCloseFilmDetailsPopup);

    this.#pageBody.classList.add('hide-overflow');
  }

  #removeFilmDetailsPopup(parentElement, childElement) {
    parentElement.removeChild(childElement);
    parentElement.classList.remove('hide-overflow');
  }

  #getCommentsByIds(comments, ids) {
    comments.forEach((comment) => {
      if (ids.includes(comment.id)) {
        this.#filmComments.push(comment);
      }
    });

    return this.#filmComments;
  }

  #handleCloseFilmDetailsPopup = (evt) => {
    evt.preventDefault();

    if (isKeydownNotEscapeKey(evt)) {
      return;
    }

    document.removeEventListener('keydown', this.#handleCloseFilmDetailsPopup);

    this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
    this.#filmDetailsPopup = null;
  };

  changePopupControlButtonsActivity(userDetail) {
    if (this.#filmDetailsPopup) {
      this.#filmDetailsPopup.changePopupControlButtonsActivity(userDetail);
    }
  }
}
