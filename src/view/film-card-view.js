import AbstractView from '../framework/view/abstract-view.js';
import {
  humanizeDate,
  convertMinutesToHoursAndMinutes,
  getStringFromArray,
  transformFirstSymbolToUpperCase,
  limitTextLength,
  getSingularOrPluralForm
} from '../utils.js';
import {
  COMMENT_FORMS,
  DATE_FORMAT_SHORT,
  ACTIVE_FILM_CARD_USER_DETAIL_CLASS,
  FILM_MODEL_ACTIONS
} from '../const.js';

function createFilmCardTemplate({ filmInfo, comments, userDetails }) {
  return `
    <article class="film-card">
      <a class="film-card__link">
          <h3 class="film-card__title">${filmInfo.title}</h3>
          <p class="film-card__rating">${filmInfo.totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${humanizeDate(filmInfo.release.date, DATE_FORMAT_SHORT)}</span>
            <span class="film-card__duration">${convertMinutesToHoursAndMinutes(filmInfo.duration)}</span>
            <span class="film-card__genre">${getStringFromArray(filmInfo.genre, ', ', transformFirstSymbolToUpperCase)}</span>
          </p>
          <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${limitTextLength(filmInfo.description, 139)}</p>
          <span class="film-card__comments">${comments.length} ${getSingularOrPluralForm(COMMENT_FORMS, comments.length)}</span>
      </a>
      <div class="film-card__controls">
          <button
            class="
              film-card__controls-item
              film-card__controls-item--add-to-watchlist
              ${(userDetails.watchlist) ? ACTIVE_FILM_CARD_USER_DETAIL_CLASS : ''}
            "
            type="button"
            data-id="watchlist"
          >
            Add to watchlist
          </button>

          <button
            class="
              film-card__controls-item
              film-card__controls-item--mark-as-watched
              ${userDetails.alreadyWatched ? ACTIVE_FILM_CARD_USER_DETAIL_CLASS : ''}
            "
            type="button"
            data-id="watched"
          >
            Mark as watched
          </button>

          <button
            class="
              film-card__controls-item
              film-card__controls-item--favorite
              ${userDetails.favorite ? ACTIVE_FILM_CARD_USER_DETAIL_CLASS : ''}
            "
            type="button"
            data-id="favorite"
          >
            Mark as favorite
          </button>
      </div>
    </article>
  `;
}

export default class FilmCardView extends AbstractView {
  #film = null;
  #handleFilmCardClick = null;
  #handleControlButtonsClick = null;

  constructor({ film, onFilmCardClick, onControlButtonsClick, filmsModel }) {
    super();

    this.#film = film;
    this.#handleFilmCardClick = onFilmCardClick;
    this.#handleControlButtonsClick = onControlButtonsClick;

    this.element.querySelector('.film-card__link').addEventListener('click', this.#filmCardClickHandler);
    this.element.querySelector('.film-card__controls').addEventListener('click', this.#changeControllButtonsActivity);
    filmsModel.addObserver(this.#shakeCard);
  }

  #shakeCard = (action, payload) => {
    if (payload.response || !payload.filmCard) {
      return;
    }

    switch (action) {
      case FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS:
        payload.filmCard.shake();
        break;
    }
  };

  get template() {
    return createFilmCardTemplate(this.#film);
  }

  #changeControllButtonsActivity = (evt) => {
    evt.preventDefault();

    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    this.#handleControlButtonsClick(evt, this.#film, this);
  };

  #filmCardClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilmCardClick(this.element.querySelector('.film-card__controls'));
  };
}
