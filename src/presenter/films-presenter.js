import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnView from '../view/films-list-show-more-btn-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import {render} from '../render.js';

export default class FilmsBoardPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();
  filmsListTopRatedContainerComponent = new FilmsListContainerView();
  filmsListTopRatedComponent = new FilmsListTopRatedView();
  filmsListTopCommentedContainerComponent = new FilmsListContainerView();
  filmsListTopCommentedComponent = new FilmsListTopCommentedView();

  constructor({filmsContainer}) {
    this.filmsContainer = filmsContainer;
  }

  init() {
    render(this.filmsComponent, this.filmsContainer);

    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsListContainerComponent.getElement());
    }

    render(new FilmsListShowMoreBtnView(), this.filmsListComponent.getElement());

    render(this.filmsListTopRatedComponent, this.filmsComponent.getElement());
    render(this.filmsListTopRatedContainerComponent, this.filmsListTopRatedComponent.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.filmsListTopRatedContainerComponent.getElement());
    }

    render(this.filmsListTopCommentedComponent, this.filmsComponent.getElement());
    render(this.filmsListTopCommentedContainerComponent, this.filmsListTopCommentedComponent.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.filmsListTopCommentedContainerComponent.getElement());
    }
  }
}
