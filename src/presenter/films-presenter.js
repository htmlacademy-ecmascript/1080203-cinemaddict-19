import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnPresenter from './films-list-show-more-btn-presenter.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmsListEmptyView from '../view/films-list-empty-view.js';
import FilmCardsPresenter from './film-cards-presenter.js';
import FilmsNavigationPresenter from './films-navigation-presenter.js';
import FilmsSortingPresenter from './films-sorting-presenter.js';
import { render } from '../render.js';
import { clearChildElements } from '../utils.js';
import {
  FILMS_COUNT_PER_STEP,
  TOP_RATED_FILMS_COUNT,
  TOP_COMMENTED_FILMS_COUNT,
  USER_DETAILS_VALUES_BY_BTN_ID,
  FILM_FILTER_TYPES_BY_HASH
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
  #films = null;
  #commentsModel = null;
  #filmsListShowMoreBtn = null;
  #renderedFilmCardsCount = FILMS_COUNT_PER_STEP;
  #filmsFilterName = null;
  #filmsSortingName = null;
  #filmCards = null;
  #filmsNavigationPresenter = new FilmsNavigationPresenter();
  #filmsSortingPresenter = new FilmsSortingPresenter();
  #filmsListEmptyView = new FilmsListEmptyView();

  constructor({filmsContainer, filmsModel, commentsModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#films = [...this.#filmsModel.getFilms()];
    this.#filmCards = new FilmCardsPresenter({
      commentsModel: this.#commentsModel,
      onControlButtonsClick: this.#controlButtonsClickHandler
    });
    this.#filmsListShowMoreBtn = new FilmsListShowMoreBtnPresenter({
      filmsListComponent: this.#filmsListComponent,
      filmCards: this.#filmCards,
      filmsListContainerComponent: this.#filmsListContainerComponent
    });
  }

  #getFilteredAndSortedFilmsList(filmsFilterName, filmsSortingName) {
    return [...this.#filmsModel.getFilms(filmsFilterName, filmsSortingName)];
  }

  #renderFilteredAndSortedFilmCards = (renderedFilmCardsCount) => {
    clearChildElements(this.#filmsListContainerComponent.element);

    this.#filmsListShowMoreBtn.remove();

    this.#films = this.#getFilteredAndSortedFilmsList(this.#filmsFilterName, this.#filmsSortingName);

    if (this.#films.length) {
      this.#filmCards.init(this.#films, this.#filmsListContainerComponent.element, renderedFilmCardsCount);
    } else {
      render(this.#filmsListEmptyView, this.#filmsListContainerComponent.element);
    }

    this.#filmsListShowMoreBtn.init({
      renderedFilmCardsCount,
      films: this.#films
    });
  };

  #filteredFilmCardsHandler = (filmsFilterName) => {
    this.#filmsFilterName = filmsFilterName;
    this.#renderedFilmCardsCount = FILMS_COUNT_PER_STEP;

    this.#renderFilteredAndSortedFilmCards(this.#renderedFilmCardsCount);
  };

  #sortedFilmCardsHandler = (filmsSortingName) => {
    this.#filmsSortingName = filmsSortingName;
    this.#renderedFilmCardsCount = this.#filmsListShowMoreBtn.renderedFilmCardsCount;

    this.#renderFilteredAndSortedFilmCards(this.#renderedFilmCardsCount);
  };

  #controlButtonsClickHandler = (evt, filmId) => {
    const changedUserDetailId = evt.target.id || evt.target.dataset.id;
    const key = USER_DETAILS_VALUES_BY_BTN_ID[changedUserDetailId];
    const hash = FILM_FILTER_TYPES_BY_HASH[this.#filmsFilterName];

    this.#filmsModel.changeControlButtonsActivity(changedUserDetailId, filmId);

    const changedUserDetailValue = this.#filmsModel.getFilmById(filmId).userDetails[key];

    this.#filmCards.changePopupControlButtonsActivity({ changedUserDetailId, changedUserDetailValue });

    if (key === hash) {
      this.#renderFilteredAndSortedFilmCards(this.#renderedFilmCardsCount);
    }

    this.#filmsNavigationPresenter.changeFilmCountByControlButtonId(changedUserDetailId);

    return {
      changedUserDetailId,
      changedUserDetailValue
    };
  };

  init() {
    if (!this.#films.length) {
      render(this.#filmsListEmptyView, this.#filmsContainer);
      return;
    }

    this.#filmsNavigationPresenter.init({
      onFilmsNavClick: this.#filteredFilmCardsHandler,
      films: this.#films,
      mainElement: this.#mainElement
    });

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
}
