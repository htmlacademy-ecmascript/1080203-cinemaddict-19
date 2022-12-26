import SortingView from '../view/sorting-view.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnView from '../view/films-list-show-more-btn-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../render.js';
import {
  FILMS_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  TOP_COMMENTED_FILMS_COUNT
} from '../const.js';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListTopCommentedContainerComponent = new FilmsListContainerView();
  #filmsListTopCommentedComponent = new FilmsListTopCommentedView();
  #pageBody = document.querySelector('body');
  #mainElement = document.querySelector('.main');
  #filmsContainer = null;
  #filmsModel = null;
  #films = null;
  #filmsNextStep = null;
  #commentsModel = null;
  #filmsListShowMoreBtn = null;
  #renderedFilmCardsCount = FILMS_COUNT_PER_STEP;

  constructor({filmsContainer, filmsModel, commentsModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = [...this.#filmsModel.getFilms()];
  }

  #removeFilmDetailsPopupAndHandler(parentElement, childElement, handler) {
    parentElement.removeChild(childElement);
    parentElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', handler);
  }

  #getCommentsByIds(comments, ids) {
    this.filmComments = [];
    comments.forEach((comment) => {
      if (ids.includes(comment.id)) {
        this.filmComments.push(comment);
      }
    });

    return this.filmComments;
  }

  #renderFilmCards(films, filmsContainer, cardsCount) {
    for (let i = 0; i < Math.min(films.length, cardsCount); i++) {
      const filmCard = new FilmCardView({ film: films[i] });
      const filmDetailsPopup = new FilmDetailsPopupView({
        filmDetails: films[i],
        filmComments: this.#getCommentsByIds(this.#commentsModel.comments, films[i].comments)
      });

      const filmDetailsPopupHandler = (e) => {
        e.preventDefault();
        this.#removeFilmDetailsPopupAndHandler(this.#pageBody, filmDetailsPopup.element, filmDetailsPopupHandler);
      };

      render(filmCard, filmsContainer);

      filmCard.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
        evt.preventDefault();

        if (this.#pageBody.querySelector(`.${filmDetailsPopup.element.className}`)) {
          this.#pageBody.removeChild(filmDetailsPopup.element); // Здесь не работает
        }

        render(filmDetailsPopup, this.#pageBody);

        filmDetailsPopup.element.querySelector('.film-details__close-btn').addEventListener('click', filmDetailsPopupHandler);

        this.#pageBody.classList.add('hide-overflow');
        document.addEventListener('keydown', filmDetailsPopupHandler);
      });
    }
  }

  #filmsListShowMoreBtnClickHandler = (evt) => {
    evt.preventDefault();

    this.#filmsNextStep = this.#films.slice(this.#renderedFilmCardsCount, this.#renderedFilmCardsCount + FILMS_COUNT_PER_STEP);
    this.#renderFilmCards(this.#filmsNextStep, this.#filmsListContainerComponent.element, FILMS_COUNT_PER_STEP);

    this.#renderedFilmCardsCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCardsCount >= this.#films.length) {
      this.#filmsListShowMoreBtn.element.remove();
      this.#filmsListShowMoreBtn.removeElement();
    }
  };

  init() {
    if (this.#films.length) {
      render(new SortingView(), this.#mainElement);

      render(this.#filmsComponent, this.#filmsContainer);

      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

      this.#renderFilmCards(this.#films, this.#filmsListContainerComponent.element, FILMS_COUNT_PER_STEP);

      if (this.#films.length > FILMS_COUNT_PER_STEP) {
        this.#filmsListShowMoreBtn = new FilmsListShowMoreBtnView();
        render(this.#filmsListShowMoreBtn, this.#filmsListComponent.element);
        this.#filmsListShowMoreBtn.element.addEventListener('click', this.#filmsListShowMoreBtnClickHandler);
      }

      render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);
      render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);
      this.#renderFilmCards(this.#films, this.#filmsListTopRatedContainerComponent.element, TOP_RATED_FILMS_COUNT);

      render(this.#filmsListTopCommentedComponent, this.#filmsComponent.element);
      render(this.#filmsListTopCommentedContainerComponent, this.#filmsListTopCommentedComponent.element);
      this.#renderFilmCards(this.#films, this.#filmsListTopCommentedContainerComponent.element, TOP_COMMENTED_FILMS_COUNT);
    } else {
      render(new FilmsListEmptyView(), this.#filmsContainer);
    }
  }
}
