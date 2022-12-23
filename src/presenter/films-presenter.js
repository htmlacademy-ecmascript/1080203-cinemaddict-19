import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnView from '../view/films-list-show-more-btn-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../render.js';

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
  }

  init() {
    this.films = [...this.filmsModel.getFilms()];

    function removeFilmDetailsPopup(parentElement, childElement, handler) {
      parentElement.removeChild(childElement);
      parentElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', handler);
    }

    render(this.filmsComponent, this.filmsContainer);

    render(this.filmsListComponent, this.filmsComponent.element);
    render(this.filmsListContainerComponent, this.filmsListComponent.element);
    for (let i = 0; i < 5; i++) {
      const filmCard = new FilmCardView({ film: this.films[i] });

      render(filmCard, this.filmsListContainerComponent.element);

      filmCard.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
        evt.preventDefault();

        const filmDetailsPopup = new FilmDetailsPopupView({
          filmDetails: this.films[i],
          filmComments: getCommentsByIds(this.commentsModel.comments, this.films[i].comments)
        });

        const escapeKeyDownHandler = (e) => {
          if (e.key === 'Escape' || e.key === 'Esc') {
            evt.preventDefault();
            removeFilmDetailsPopup(this.pageBody, filmDetailsPopup.element, escapeKeyDownHandler);
          }
        };

        render(filmDetailsPopup, this.pageBody);

        filmDetailsPopup.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
          removeFilmDetailsPopup(this.pageBody, filmDetailsPopup.element, escapeKeyDownHandler);
        });

        this.pageBody.classList.add('hide-overflow');
        document.addEventListener('keydown', escapeKeyDownHandler);
      });
    }

    render(new FilmsListShowMoreBtnView(), this.filmsListComponent.element);

    render(this.filmsListTopRatedComponent, this.filmsComponent.element);
    render(this.filmsListTopRatedContainerComponent, this.filmsListTopRatedComponent.element);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView({ film: this.films[i] }), this.filmsListTopRatedContainerComponent.element);
    }

    render(this.filmsListTopCommentedComponent, this.filmsComponent.element);
    render(this.filmsListTopCommentedContainerComponent, this.filmsListTopCommentedComponent.element);
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView({ film: this.films[i] }), this.filmsListTopCommentedContainerComponent.element);
    }
  }
}
