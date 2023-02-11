import FilmDetailsPopupPresenter from './film-details-popup-presenter';
import FilmCardView from '../view/film-card-view';
import { render } from '../framework/render.js';

export default class FilmCardsPresenter {
  #films = null;
  #filmsContainer = null;
  #cardsCount = null;
  #filmDetailsPopup = null;
  #handleControlButtonsClick = null;
  #filmsModel = null;

  constructor({ filmsModel, commentsModel, onControlButtonsClick }) {
    this.#handleControlButtonsClick = onControlButtonsClick;
    this.#filmDetailsPopup = new FilmDetailsPopupPresenter({ filmsModel, commentsModel, onControlButtonsClick });
    this.#filmsModel = filmsModel;
  }

  init(films, filmsContainer, cardsCount) {
    this.#films = films;
    this.#filmsContainer = filmsContainer;
    this.#cardsCount = cardsCount;

    for (let i = 0; i < Math.min(this.#films.length, this.#cardsCount); i++) {
      const filmCard = new FilmCardView({
        film: this.#films[i],
        onFilmCardClick: () => {
          this.#filmDetailsPopup.init(this.#films[i]);
        },
        onControlButtonsClick: this.#handleControlButtonsClick,
        filmsModel: this.#filmsModel
      });

      render(filmCard, this.#filmsContainer);
    }
  }
}
