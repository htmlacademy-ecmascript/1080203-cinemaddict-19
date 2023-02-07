import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../framework/render.js';
import { isEscapeKey, isCtrlEnterKey } from '../utils.js';
import { COMMENTS_ACTIONS } from '../const.js';

export default class FilmDetailsPopupPresenter {
  #filmDetailsPopup = null;
  #pageBody = document.querySelector('body');
  #filmsModel = null;
  #commentsModel = null;
  #controlButtonsClickHandler = null;

  constructor({ filmsModel, commentsModel, onControlButtonsClick }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#controlButtonsClickHandler = onControlButtonsClick;

    this.#commentsModel.addObserver(this.#updateComments);
  }

  init(film) {
    if (this.#filmDetailsPopup) {
      this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
    }

    this.#filmDetailsPopup = new FilmDetailsPopupView({
      filmDetails: film,
      filmsModel: this.#filmsModel,
      commentsModel: this.#commentsModel,
      onCloseFilmDetailsPopup: this.#handleCloseFilmDetailsPopup,
      onControlButtonsClick: this.#controlButtonsClickHandler,
      onCommentUpdate: this.#handleCommentUpdate
    });

    render(this.#filmDetailsPopup, this.#pageBody);

    document.addEventListener('keydown', this.#keydownHandler);

    this.#pageBody.classList.add('hide-overflow');
  }

  remove() {
    document.removeEventListener('keydown', this.#keydownHandler);

    this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
  }

  changePopupControlButtonsActivity(userDetail) {
    if (this.#filmDetailsPopup) {
      this.#filmDetailsPopup.changePopupControlButtonsActivity(userDetail);
    }
  }

  #updateComments = (action, updatedComments) => {
    switch (action) {
      case 'update': // todo Заменить на константу COMMENTS_MODEL_ACTIONS.UPDATE
        this.#filmDetailsPopup.updateComments({ action, updatedComments });
        break;
    }
  };

  #removeFilmDetailsPopup(parentElement, childElement) {
    parentElement.removeChild(childElement);
    parentElement.classList.remove('hide-overflow');
    this.#filmDetailsPopup = null;
  }

  #handleCommentUpdate = (action, commentData) => {
    if (action === COMMENTS_ACTIONS.CREATE && (!commentData.commentEmojiName || !commentData.commentText)) {
      return;
    }

    this.#filmsModel.updateFilm(action, commentData);
    this.#commentsModel.updateComments(action, commentData);
  };

  #handleSaveNewFilmComment = () => {
    this.#handleCommentUpdate(COMMENTS_ACTIONS.CREATE, this.#filmDetailsPopup.newCommentData);
  };

  #handleCloseFilmDetailsPopup = () => {
    document.removeEventListener('keydown', this.#keydownHandler);

    this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
  };

  #keydownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.#handleCloseFilmDetailsPopup();
    } else if (isCtrlEnterKey(evt)) {
      this.#handleSaveNewFilmComment();
    }
  };
}
