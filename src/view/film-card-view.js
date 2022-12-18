import {createElement} from '../render.js';
import {
  humanizeDate,
  convertMinutesToHoursAndMinutes,
  getStringFromArray,
  transformFirstSymbolToUpperCase,
  limitTextLength,
  getSingularOrPluralForm
} from '../utils.js';
import {COMMENT_FORMS, DATE_FORMAT_SHORT} from '../const.js';

function createFilmCardTemplate({filmInfo, comments}) {
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
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
}

export default class FilmCardView {
  constructor({film}) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.element.querySelector('.film-card__link').dataset.filmId = this.film.id;
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
