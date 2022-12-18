import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnView from '../view/films-list-show-more-btn-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import {render} from '../render.js';

function getCommentsByIds(comments, ids) {
  const filmComments = [];
  comments.forEach((comment) => {
    if (ids.includes(comment.id)) {
      filmComments.push(comment);
    }
  });

  return filmComments;
}

export default class FilmsPresenter {
  filmsComponent = new FilmsView();
  filmsListComponent = new FilmsListView();
  filmsListContainerComponent = new FilmsListContainerView();
  filmsListTopRatedContainerComponent = new FilmsListContainerView();
  filmsListTopRatedComponent = new FilmsListTopRatedView();
  filmsListTopCommentedContainerComponent = new FilmsListContainerView();
  filmsListTopCommentedComponent = new FilmsListTopCommentedView();
  pageBody = document.querySelector('body');

  constructor({filmsContainer, filmsModel, commentsModel}) {
    this.filmsContainer = filmsContainer;
    this.filmsModel = filmsModel;
    this.commentsModel = commentsModel;

    render(
      new FilmDetailsPopupView({
        filmDetails: this.filmsModel.films[0],
        filmComments: getCommentsByIds(this.commentsModel.comments, this.filmsModel.films[0].comments)
      }),
      this.pageBody
    );
  }

  init() {
    this.films = [...this.filmsModel.getFilms()];

    render(this.filmsComponent, this.filmsContainer);

    render(this.filmsListComponent, this.filmsComponent.getElement());
    render(this.filmsListContainerComponent, this.filmsListComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView({film: this.films[i]}), this.filmsListContainerComponent.getElement());
    }

    render(new FilmsListShowMoreBtnView(), this.filmsListComponent.getElement());

    render(this.filmsListTopRatedComponent, this.filmsComponent.getElement());
    render(this.filmsListTopRatedContainerComponent, this.filmsListTopRatedComponent.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView({film: this.films[i]}), this.filmsListTopRatedContainerComponent.getElement());
    }

    render(this.filmsListTopCommentedComponent, this.filmsComponent.getElement());
    render(this.filmsListTopCommentedContainerComponent, this.filmsListTopCommentedComponent.getElement());
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView({film: this.films[i]}), this.filmsListTopCommentedContainerComponent.getElement());
    }
  }
}
