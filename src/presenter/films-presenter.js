import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnPresenter from './films-list-show-more-btn-presenter.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmCardsPresenter from './film-cards-presenter.js';
import FilmsSortingPresenter from './films-sorting-presenter.js';
import LoadingView from '../view/loading-view.js';
import { render, remove } from '../framework/render.js';
import { clearChildElements, sortArrayByNestedObjectProperty } from '../utils.js';
import {
  FILMS_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  TOP_COMMENTED_FILMS_COUNT,
  FILM_MODEL_ACTIONS,
  FILMS_SORTING_HASHES,
  FILM_FILTER_TYPES_BY_HASH,
  FILMS_FILTER_ACTIONS
} from '../const.js';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListTopCommentedContainerComponent = new FilmsListContainerView();
  #filmsListTopCommentedComponent = new FilmsListTopCommentedView();
  #mainElement = document.querySelector('.main');
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;
  #films = null;
  #filmsListShowMoreBtn = null;
  #renderedFilmCardsCount = FILMS_COUNT_PER_STEP;
  #filmsFilterModel = null;
  #filmsSortingName = null;
  #filmCards = null;
  #filmsSortingPresenter = new FilmsSortingPresenter();
  #filmsListEmptyView = new FilmsListEmptyView();
  #currentFilmFilter = null;
  #loadingComponent = new LoadingView();
  #isLoading = true;

  constructor({ filmsContainer, filmsModel, commentsModel, filtersModel }) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = null;
    this.#filmsFilterModel = filtersModel;
    this.#filmCards = new FilmCardsPresenter({
      filmsModel,
      commentsModel,
      onControlButtonsClick: this.#controlButtonsClickHandler
    });
    this.#filmsListShowMoreBtn = new FilmsListShowMoreBtnPresenter({
      filmsListComponent: this.#filmsListComponent,
      filmCards: this.#filmCards,
      filmsListContainerComponent: this.#filmsListContainerComponent
    });

    this.#filmsFilterModel.addObserver(this.#changeCurrentFilmsFilter);
    this.#filmsFilterModel.addObserver(this.#resetFilmsSorting);
    this.#filmsFilterModel.addObserver(this.#renderFilteredAndSortedFilmCards);
    this.#commentsModel.addObserver(this.#renderFilteredAndSortedFilmCards);
    // this.#filmsModel.addObserver(this.#renderTopCommentedFilms);
    // this.#filmsModel.addObserver(this.#renderTopRatedFilms);
    this.#filmsModel.addObserver(this.#renderFilmBoard);
  }

  #renderFilmBoard = (action, data) => {
    switch (action) {
      case FILM_MODEL_ACTIONS.INIT:
        this.#isLoading = !this.#isLoading;

        remove(this.#loadingComponent);

        this.#films = data.films;

        this.init();
        this.#renderTopRatedFilms();
        this.#renderTopCommentedFilms(data);
        break;
      case FILM_MODEL_ACTIONS.CHANGE_USER_DETAILS:
        if (!data.response) {
          return;
        }

        this.#renderFilteredAndSortedFilmCards();
        this.#renderTopRatedFilms();
        this.#renderTopCommentedFilms(data);
        break;
      case FILM_MODEL_ACTIONS.UPDATE:
        this.#films = data.films;

        this.#renderFilteredAndSortedFilmCards();
        this.#renderTopRatedFilms();
        this.#renderTopCommentedFilms(data);
        break;
    }
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#filmsContainer);
  }

  init() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.#films.length) {
      this.#filmsListEmptyView.init({
        filmsListContainer: this.#filmsContainer,
        currentFilmFilter: this.#currentFilmFilter
      });
      return;
    }

    this.#filmsSortingPresenter.init({
      onFilmsSortingClick: this.#sortedFilmCardsHandler,
      mainElement: this.#mainElement
    });

    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    this.#filmCards.init(this.#films, this.#filmsListContainerComponent.element, FILMS_COUNT_PER_STEP);

    this.#filmsListShowMoreBtn.init({
      renderedFilmCardsCount: this.#renderedFilmCardsCount,
      films: this.#films
    });

    render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);
    render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);

    render(this.#filmsListTopCommentedComponent, this.#filmsComponent.element);
    render(this.#filmsListTopCommentedContainerComponent, this.#filmsListTopCommentedComponent.element);
  }

  #renderTopRatedFilms = () => {
    const sortedByRatingFilms = this.#getFilteredAndSortedFilmsList(FILM_FILTER_TYPES_BY_HASH.all, FILMS_SORTING_HASHES.RATING);
    const isTopRatedEmpty = (films) => films.every((film) => film.filmInfo.totalRating === 0);

    this.#filmsListTopRatedContainerComponent.element.innerHTML = '';

    if (!isTopRatedEmpty(sortedByRatingFilms)) {
      this.#filmCards.init(sortedByRatingFilms, this.#filmsListTopRatedContainerComponent.element, TOP_RATED_FILMS_COUNT);
    }
  };

  #renderTopCommentedFilms = (payload) => {
    const sortedByCommentsFilms = this.#getSortedByCommentsFilms(payload.films);
    const isTopCommentedEmpty = (films) => films.every((film) => film.comments.length === 0);

    this.#filmsListTopCommentedContainerComponent.element.innerHTML = '';

    if (!isTopCommentedEmpty(sortedByCommentsFilms)) {
      this.#filmCards.init(sortedByCommentsFilms, this.#filmsListTopCommentedContainerComponent.element, TOP_COMMENTED_FILMS_COUNT);
    }
  };

  #changeCurrentFilmsFilter = () => (this.#currentFilmFilter = this.#filmsFilterModel.getCurrentFilter());

  #resetFilmsSorting = () => {
    this.#filmsSortingName = null;
    this.#renderedFilmCardsCount = FILMS_COUNT_PER_STEP;

    this.#filmsSortingPresenter.resetActiveSortToDefault();
  };

  #getFilteredAndSortedFilmsList = (filmsFilterName, filmsSortingName) => this.#filmsModel.getFilms(filmsFilterName, filmsSortingName);

  #getSortedByCommentsFilms = (films) => {
    if (!films) {
      films = this.#filmsModel.getFilms();
    }

    return sortArrayByNestedObjectProperty([...films], 'comments.length', true);
  };

  #renderFilteredAndSortedFilmCards = (action) => {
    switch (action) {
      case FILMS_FILTER_ACTIONS.CHANGE:
        this.#renderedFilmCardsCount = FILMS_COUNT_PER_STEP;
        break;

      default:
        this.#renderedFilmCardsCount = this.#filmsListShowMoreBtn.renderedFilmCardsCount;
        break;
    }

    clearChildElements(this.#filmsListContainerComponent.element);

    this.#filmsListShowMoreBtn.remove();

    this.#films = this.#getFilteredAndSortedFilmsList(this.#currentFilmFilter, this.#filmsSortingName);

    if (this.#films.length) {
      this.#filmCards.init(this.#films, this.#filmsListContainerComponent.element, this.#renderedFilmCardsCount);
    } else {
      this.#filmsListEmptyView.init({
        filmsListContainer: this.#filmsListContainerComponent.element,
        currentFilmFilter: this.#currentFilmFilter
      });
    }

    this.#filmsListShowMoreBtn.init({
      renderedFilmCardsCount: this.#renderedFilmCardsCount,
      films: this.#films
    });
  };

  #sortedFilmCardsHandler = (filmsSortingName) => {
    this.#filmsSortingName = filmsSortingName;
    this.#renderedFilmCardsCount = this.#filmsListShowMoreBtn.renderedFilmCardsCount;

    this.#renderFilteredAndSortedFilmCards();
  };

  #controlButtonsClickHandler = (evt, film, filmCard) => {
    const changedUserDetailId = evt.target.id || evt.target.dataset.id;

    this.#filmsModel.changeControlButtonsActivity(changedUserDetailId, film, filmCard);

    this.#renderedFilmCardsCount = this.#filmsListShowMoreBtn.renderedFilmCardsCount;
  };
}
