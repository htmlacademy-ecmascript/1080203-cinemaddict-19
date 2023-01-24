import AbstractView from '../framework/view/abstract-view.js';
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
  ACTIVE_FILM_CARD_USER_DETAIL_CLASS
} from '../const.js';

function getGenresListElements(genres) {
  const genresList = [];
  genres.forEach((genre) => {
    genresList.push(`<span class="film-details__genre">${transformFirstSymbolToUpperCase(genre)}</span>`);
  });
  return genresList;
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
  return filmCommentsListElements;
}

function createFilmDetailsPopupTemplate({ filmInfo, userDetails }, comments) {
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
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">${getFilmCommentsListElements(comments)}</ul>

            <form class="film-details__new-comment" action="" method="get">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
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

export default class FilmDetailsPopupView extends AbstractView {
  #filmDetails = null;
  #filmComments = null;
  #handleCloseFilmDetailsPopup = null;
  #handleControlButtonsClick = null;
  #filmCardButtonsElement = null;

  constructor({
    filmDetails,
    filmComments,
    onCloseFilmDetailsPopup,
    onControlButtonsClick,
    filmCardButtonsElement
  }) {
    super();
    this.#filmDetails = filmDetails;
    this.#filmComments = filmComments;
    this.#handleCloseFilmDetailsPopup = onCloseFilmDetailsPopup;
    this.#handleControlButtonsClick = onControlButtonsClick;
    this.#filmCardButtonsElement = filmCardButtonsElement;

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeFilmDetailsPopupHandler);
    this.element.querySelector('.film-details__controls').addEventListener('click', this.#changeControllButtonsActivity);
  }

  get template() {
    return createFilmDetailsPopupTemplate(this.#filmDetails, this.#filmComments);
  }

  #closeFilmDetailsPopupHandler = (evt) => {
    evt.preventDefault();

    this.element.querySelector('.film-details__close-btn').removeEventListener('click', this.#closeFilmDetailsPopupHandler);

    this.#handleCloseFilmDetailsPopup(evt);
  };

  #changeControllButtonsActivity = (evt) => {
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

    changeElementActivityByClass({
      element: this.#filmCardButtonsElement.querySelector(`[data-id="${changedUserDetailId}"]`),
      className: ACTIVE_FILM_CARD_USER_DETAIL_CLASS,
      activityStatus: changedUserDetailValue
    });
  };

  changePopupControlButtonsActivity({ changedUserDetailId, changedUserDetailValue }) {
    changeElementActivityByClass({
      element: this.element.querySelector(`#${changedUserDetailId}`),
      className: ACTIVE_FILM_POPUP_USER_DETAIL_CLASS,
      activityStatus: changedUserDetailValue
    });
  }
}
