import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  getStringFromArray,
  humanizeDate,
  convertMinutesToHoursAndMinutes,
  transformFirstSymbolToUpperCase,
  changeElementActivityByClass
} from '../utils.js';
import {
  DATE_FORMAT_FULL,
  ACTIVE_FILM_POPUP_USER_DETAIL_CLASS,
  EMOJI_NAMES
} from '../const.js';

function getGenresListElements(genres) {
  const genresList = [];
  genres.forEach((genre) => {
    genresList.push(`<span class="film-details__genre">${transformFirstSymbolToUpperCase(genre)}</span>`);
  });
  return genresList;
}

function getChosenEmojiImgElement(emojiName) {
  return emojiName ? `<img src="./images/emoji/${emojiName}.png" width="70" height="70" alt="emoji">` : '';
}

function getDetailsControlButtonsListElements({ watchlist, alreadyWatched, favorite }) {
  return `
    <button
      type="button"
      class="
        film-details__control-button
        ${watchlist ? ACTIVE_FILM_POPUP_USER_DETAIL_CLASS : ''}
        film-details__control-button--watchlist
      "
      id="watchlist"
      name="watchlist"
    >
      Add to watchlist
    </button>

    <button
      type="button"
      class="
        film-details__control-button
        ${alreadyWatched ? ACTIVE_FILM_POPUP_USER_DETAIL_CLASS : ''}
        film-details__control-button--watched
      "
      id="watched"
      name="watched"
    >
      Already watched
    </button>

    <button
      type="button"
      class="
        film-details__control-button
        ${favorite ? ACTIVE_FILM_POPUP_USER_DETAIL_CLASS : ''}
        film-details__control-button--favorite
      "
      id="favorite"
      name="favorite"
    >
      Add to favorites
    </button>
  `;
}

function getFilmCommentsListElements(comments) {
  const filmCommentsListElements = [];
  comments.forEach((comment) => {
    filmCommentsListElements.push(`
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${humanizeDate(comment.date, DATE_FORMAT_FULL, true)}</span>
            <button class="film-details__comment-delete" data-comment-id="${comment.id}">Delete</button>
          </p>
        </div>
      </li>
    `);
  });

  return filmCommentsListElements.join('');
}

function createFilmDetailsPopupTemplate({ filmInfo, userDetails }, state) {
  return `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="${filmInfo.alternativeTitle}">

              <p class="film-details__age">${filmInfo.ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmInfo.title}</h3>
                  <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmInfo.totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmInfo.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${getStringFromArray(filmInfo.writers, ', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${getStringFromArray(filmInfo.actors, ', ')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${humanizeDate(filmInfo.release.date, DATE_FORMAT_FULL)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${convertMinutesToHoursAndMinutes(filmInfo.duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${getStringFromArray(getGenresListElements(filmInfo.genre), '')}</td>
                </tr>
              </table>

              <p class="film-details__film-description">${filmInfo.description}</p>
            </div>
          </div>

          <section class="film-details__controls">${getDetailsControlButtonsListElements(userDetails)}</section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${state.comments.length}</span></h3>

            <ul class="film-details__comments-list">${getFilmCommentsListElements(state.comments)}</ul>

            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label">${getChosenEmojiImgElement(state.commentEmojiName)}</div>

              <label class="film-details__comment-label">
                <textarea
                  class="film-details__comment-input"
                  placeholder="Select reaction below and write comment here"
                  name="comment"
                ></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-smile"
                  value="smile"
                  ${state.commentEmojiName === EMOJI_NAMES.smile ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-sleeping"
                  value="sleeping"
                  ${state.commentEmojiName === EMOJI_NAMES.sleeping ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-puke"
                  value="puke"
                  ${state.commentEmojiName === EMOJI_NAMES.puke ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input
                  class="film-details__emoji-item visually-hidden"
                  name="comment-emoji"
                  type="radio"
                  id="emoji-angry"
                  value="angry"
                  ${state.commentEmojiName === EMOJI_NAMES.angry ? 'checked' : ''}
                >
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </form>
          </section>
        </div>
      </div>
    </section>
  `;
}

export default class FilmDetailsPopupView extends AbstractStatefulView {
  #filmDetails = null;
  #filmComments = null;
  #handleCloseFilmDetailsPopup = null;
  #handleControlButtonsClick = null;
  #handleCommentDelete = null;

  constructor({
    filmDetails,
    filmComments,
    onCloseFilmDetailsPopup,
    onControlButtonsClick,
    onCommentDeleteButtonClick
  }) {
    super();
    this.#filmDetails = filmDetails;
    this.#filmComments = filmComments;

    this._setState({
      comments: filmComments,
      commentEmojiName: null,
      commentText: '',
      lastPopupScrollTop: 0,
      isDeleting: false
    });

    this.#handleCloseFilmDetailsPopup = onCloseFilmDetailsPopup;
    this.#handleControlButtonsClick = onControlButtonsClick;
    this.#handleCommentDelete = onCommentDeleteButtonClick;

    this._restoreHandlers();
  }

  get template() {
    return createFilmDetailsPopupTemplate(this.#filmDetails, this._state);
  }

  changePopupControlButtonsActivity({ changedUserDetailId, changedUserDetailValue }) {
    changeElementActivityByClass({
      element: this.element.querySelector(`#${changedUserDetailId}`),
      className: ACTIVE_FILM_POPUP_USER_DETAIL_CLASS,
      activityStatus: changedUserDetailValue
    });
  }

  _restoreHandlers() {
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeFilmDetailsPopupHandler);
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#changeControllButtonsActivityHandler);
    this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#setCommentEmojiHandler);
    this.element.addEventListener('scroll', this.#changeLastPopupScrollTopHandler);
    this.element.querySelector('.film-details__comments-list').addEventListener('click', this.#commentDeleteHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('change', console.log);
    // todo Записать в стейт текст комментария, использовать debounce
  }

  #commentDeleteHandler = (evt) => {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    this.#handleCommentDelete({
      commentId: Number(evt.target.dataset.commentId),
      filmId: this.#filmDetails.id
    });

    // Приходится помещать копию массива с комментами фильма в стейт и из него удалять
    // В шаблон комментарии идут из стейта
    // Наверное, это не очень красиво
    this.#filmComments.find((comment, index, array) => {
      if (comment.id === Number(evt.target.dataset.commentId)) {
        array.splice(index, 1);
        return array; // Без return не работает
      }
    });

    this.updateElement({ comments: this.#filmComments });

    this.#changePopupScrollPosition();
  };

  #changePopupScrollPosition = () => {
    this.element.scrollTop = this._state.lastPopupScrollTop;
  };

  #changeLastPopupScrollTopHandler = () => {
    this._state.lastPopupScrollTop = this.element.scrollTop;
  };

  #closeFilmDetailsPopupHandler = (evt) => {
    evt.preventDefault();

    this.element.querySelector('.film-details__close-btn').removeEventListener('click', this.#closeFilmDetailsPopupHandler);

    this.#handleCloseFilmDetailsPopup(evt);
  };

  #changeControllButtonsActivityHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    const { changedUserDetailId, changedUserDetailValue } = this.#handleControlButtonsClick(evt, this.#filmDetails.id);

    changeElementActivityByClass({
      element: this.element.querySelector(`#${changedUserDetailId}`),
      className: ACTIVE_FILM_POPUP_USER_DETAIL_CLASS,
      activityStatus: changedUserDetailValue
    });
  };

  #setCommentEmojiHandler = (evt) => {
    const emojiName = evt.target.id.replace('emoji-', '');

    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateElement({
      commentEmojiName: emojiName
    });

    this.#changePopupScrollPosition();
  };
}
