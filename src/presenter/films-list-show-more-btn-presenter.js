import FilmsListShowMoreBtnView from '../view/films-list-show-more-btn-view.js';
import { render } from '../framework/render.js';
import { FILMS_COUNT_PER_STEP } from '../const.js';

export default class FilmsListShowMoreBtnPresenter {
  #films = null;
  #filmsListComponent = null;
  #filmsNextStep = null;
  #renderedFilmCardsCount = FILMS_COUNT_PER_STEP;
  #filmCards = null;
  #filmsListContainerComponent = null;
  #filmsListShowMoreBtn = null;

  constructor({ filmsListComponent, filmCards, filmsListContainerComponent }) {
    this.#filmsListComponent = filmsListComponent;
    this.#filmCards = filmCards;
    this.#filmsListContainerComponent = filmsListContainerComponent;
  }

  init({ renderedFilmCardsCount, films }) {
    this.#films = films;
    this.#renderedFilmCardsCount = renderedFilmCardsCount ? renderedFilmCardsCount : FILMS_COUNT_PER_STEP;
    this.#filmsListShowMoreBtn = new FilmsListShowMoreBtnView({
      onFlmsListShowMoreBtnClick: this.#filmsListShowMoreBtnClickHandler
    });

    if (this.#films.length > renderedFilmCardsCount) {
      render(this.#filmsListShowMoreBtn, this.#filmsListComponent.element);
    }
  }

  remove() {
    this.#filmsListShowMoreBtn.element.remove();
    this.#filmsListShowMoreBtn.removeElement();
  }

  get renderedFilmCardsCount() {
    return this.#renderedFilmCardsCount;
  }

  #filmsListShowMoreBtnClickHandler = (evt) => {
    evt.preventDefault();

    this.#filmsNextStep = this.#films.slice(this.#renderedFilmCardsCount, this.#renderedFilmCardsCount + FILMS_COUNT_PER_STEP);
    this.#filmCards.init(this.#filmsNextStep, this.#filmsListContainerComponent.element, FILMS_COUNT_PER_STEP);

    this.#renderedFilmCardsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCardsCount >= this.#films.length) {
      this.remove();
      this.#filmsNextStep = null;
    }
  };
}
