import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../framework/render.js';
import { isEscapeKey, isCtrlEnterKey } from '../utils.js';
import {
  COMMENTS_MODEL_ACTIONS,
  FILM_MODEL_ACTIONS,
  USER_DETAILS_VALUES_BY_BTN_ID
} from '../const.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

const TIME_LIMIT = {
  LOWER: 350,
  UPPER: 1000
};

export default class FilmDetailsPopupPresenter {
  #filmDetailsPopup = null;
  #pageBody = document.querySelector('body');
  #filmsModel = null;
  #commentsModel = null;
  #controlButtonsClickHandler = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMIT.LOWER,
    upperLimit: TIME_LIMIT.UPPER
  });

  constructor({ filmsModel, commentsModel, onControlButtonsClick }) {
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#controlButtonsClickHandler = onControlButtonsClick;

    this.#commentsModel.addObserver(this.#updateComments);
    this.#filmsModel.addObserver(this.#changeControlButtonsActivity);
  }

  #changeControlButtonsActivity = (action, { controlButtonId, response }) => {
    if (!this.#filmDetailsPopup) {
      return;
    }

    switch (action) {
      case FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS:
        if (!response) {
          this.#filmDetailsPopup.shake();
          return;
        }

        this.#filmDetailsPopup.changePopupControlButtonsActivity({
          changedUserDetailId: controlButtonId,
          changedUserDetailValue: response.userDetails[USER_DETAILS_VALUES_BY_BTN_ID[controlButtonId]]
        });
        break;
    }
  };

  init(film) {
    if (this.#filmDetailsPopup) {
      this.#removeFilmDetailsPopup(this.#pageBody, this.#filmDetailsPopup.element);
    }

    this.#filmDetailsPopup = new FilmDetailsPopupView({
      filmDetails: film,
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

  #updateComments = (action, updatedComments) => {
    if (!updatedComments) {
      // this.#uiBlocker.unblock();
      this.#filmDetailsPopup.shake();
      return;
    }

    switch (action) {
      case COMMENTS_MODEL_ACTIONS.CREATE:
        this.#filmDetailsPopup.updateComments({ action, updatedComments });
        break;
    }
  };

  #removeFilmDetailsPopup(parentElement, childElement) {
    parentElement.removeChild(childElement);
    parentElement.classList.remove('hide-overflow');
    this.#filmDetailsPopup = null;
  }

  #handleCommentUpdate = async (action, commentData) => {
    if (action === COMMENTS_MODEL_ACTIONS.CREATE && (!commentData.commentEmojiName || !commentData.commentText)) {
      this.#filmDetailsPopup.shake();
      return;
    }
    // this.#uiBlocker.block();

    await this.#commentsModel.updateComments(action, commentData);
    await this.#filmsModel.updateFilmsList(action);

    // this.#uiBlocker.unblock();
  };

  #handleSaveNewFilmComment = () => {
    this.#handleCommentUpdate(COMMENTS_MODEL_ACTIONS.CREATE, this.#filmDetailsPopup.newCommentData);
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
