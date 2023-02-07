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
import { clearChildElements } from '../utils.js';
import {
  FILMS_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  TOP_COMMENTED_FILMS_COUNT,
  USER_DETAILS_VALUES_BY_BTN_ID,
  FILM_MODEL_ACTIONS
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
    // this.#films = [...this.#filmsModel.getFilms()]; // todo Удалить
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
    this.#filmsModel.addObserver(this.#renderFilmBoard);
  }

  #renderFilmBoard = (action, films) => {
    switch (action) {
      case FILM_MODEL_ACTIONS.INIT:
        this.#isLoading = !this.#isLoading;

        remove(this.#loadingComponent);

        this.#films = films;

        this.init();
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
    this.#filmCards.init(this.#films, this.#filmsListTopRatedContainerComponent.element, TOP_RATED_FILMS_COUNT);

    render(this.#filmsListTopCommentedComponent, this.#filmsComponent.element);
    render(this.#filmsListTopCommentedContainerComponent, this.#filmsListTopCommentedComponent.element);
    this.#filmCards.init(this.#films, this.#filmsListTopCommentedContainerComponent.element, TOP_COMMENTED_FILMS_COUNT);
  }

  #changeCurrentFilmsFilter = () => (this.#currentFilmFilter = this.#filmsFilterModel.getCurrentFilter());

  #resetFilmsSorting = () => {
    this.#filmsSortingName = null;
    this.#renderedFilmCardsCount = FILMS_COUNT_PER_STEP;

    this.#filmsSortingPresenter.resetActiveSortToDefault();
  };

  #getFilteredAndSortedFilmsList = (filmsFilterName, filmsSortingName) => this.#filmsModel.getFilms(filmsFilterName, filmsSortingName);

  #renderFilteredAndSortedFilmCards = () => {
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

    this.#renderFilteredAndSortedFilmCards(this.#renderedFilmCardsCount);
  };

  #controlButtonsClickHandler = (evt, filmId) => {
    const changedUserDetailId = evt.target.id || evt.target.dataset.id;
    const key = USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId];

    this.#filmsModel.changeControlButtonsActivity(changedUserDetailId, filmId);

    const changedUserDetailValue = this.#filmsModel.getFilmById(filmId).userDetails[key];

    this.#filmCards.changePopupControlButtonsActivity({ changedUserDetailId, changedUserDetailValue });

    this.#renderedFilmCardsCount = this.#filmsListShowMoreBtn.renderedFilmCardsCount;

    this.#renderFilteredAndSortedFilmCards();

    return {
      changedUserDetailId,
      changedUserDetailValue
    };
  };
}
