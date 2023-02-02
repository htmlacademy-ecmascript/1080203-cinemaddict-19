import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../framework/render.js';
import { isKeydownNotEscapeKey } from '../utils.js';

export default class FilmDetailsPopupPresenter {
  #filmDetailsPopup = null;
  #pageBody = document.querySelector('body');
  #filmsModel = null;
  #commentsModel = null;
  #filmComments = [];
  #controlButtonsClickHandler = null;

  constructor({ filmsModel, commentsModel, onControlButtonsClick }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#controlButtonsClickHandler = onControlButtonsClick;

    // todo Добавить notify на изменение модели комментов, использовать статусы create, delete
  }

  init(film) {
    if (this.#filmDetailsPopup) {
      this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
    }

    this.#filmDetailsPopup = new FilmDetailsPopupView({
      filmDetails: film,
      filmComments: this.#getCommentsByIds(this.#commentsModel.getComments(), film.comments),
      onCloseFilmDetailsPopup: this.#handleCloseFilmDetailsPopup,
      onControlButtonsClick: this.#controlButtonsClickHandler,
      onCommentDeleteButtonClick: this.#handleCommentDelete
    });

    render(this.#filmDetailsPopup, this.#pageBody);

    document.addEventListener('keydown', this.#handleCloseFilmDetailsPopup);
    document.addEventListener('keydown', this.#handleSaveNewFilmComment); // todo не забыть удалить

    this.#pageBody.classList.add('hide-overflow');
  }

  #removeFilmDetailsPopup(parentElement, childElement) {
    parentElement.removeChild(childElement);
    parentElement.classList.remove('hide-overflow');
    this.#filmComments.length = 0;
    this.#filmDetailsPopup = null;
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
  };

  #handleSaveNewFilmComment = (evt) => {
    console.log(evt);
  };

  remove() {
    document.removeEventListener('keydown', this.#handleCloseFilmDetailsPopup);

    this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
  }

  changePopupControlButtonsActivity(userDetail) {
    if (this.#filmDetailsPopup) {
      this.#filmDetailsPopup.changePopupControlButtonsActivity(userDetail);
    }
  }

  #handleCommentDelete = ({ commentId, filmId }) => {
    this.#filmsModel.deleteComment({ commentId, filmId });
    this.#commentsModel.deleteComment({ commentId });
  };
}
