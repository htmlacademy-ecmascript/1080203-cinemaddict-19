import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListShowMoreBtnView from '../view/films-list-show-more-btn-view.js';
import FilmsListTopRatedView from '../view/films-list-top-rated-view.js';
import FilmsListTopCommentedView from '../view/films-list-top-commented-view.js';
import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPopupView from '../view/film-details-popup-view.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedContainerComponent = new FilmsListContainerView();
  #filmsListTopRatedComponent = new FilmsListTopRatedView();
  #filmsListTopCommentedContainerComponent = new FilmsListContainerView();
  #filmsListTopCommentedComponent = new FilmsListTopCommentedView();
  #pageBody = document.querySelector('body');
  #filmsContainer = null;
  #filmsModel = null;
  #commentsModel = null;

  constructor({filmsContainer, filmsModel, commentsModel}) {
    this.#filmsContainer = filmsContainer;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
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
    for (let i = 0; i < cardsCount; i++) {
      const filmCard = new FilmCardView({ film: films[i] });

      render(filmCard, filmsContainer);

      filmCard.element.querySelector('.film-card__link').addEventListener('click', (evt) => {
        evt.preventDefault();

        const filmDetailsPopup = new FilmDetailsPopupView({
          filmDetails: films[i],
          filmComments: this.#getCommentsByIds(this.#commentsModel.comments, films[i].comments)
        });

        const escapeKeyDownHandler = (e) => {
          if (e.key === 'Escape' || e.key === 'Esc') {
            evt.preventDefault();
            this.#removeFilmDetailsPopupAndHandler(this.#pageBody, filmDetailsPopup.element, escapeKeyDownHandler);
          }
        };

        render(filmDetailsPopup, this.#pageBody);

        filmDetailsPopup.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
          this.#removeFilmDetailsPopupAndHandler(this.#pageBody, filmDetailsPopup.element, escapeKeyDownHandler);
        });

        this.#pageBody.classList.add('hide-overflow');
        document.addEventListener('keydown', escapeKeyDownHandler);
      });
    }
  }

  init() {
    this.films = [...this.#filmsModel.getFilms()];

    render(this.#filmsComponent, this.#filmsContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsListContainerComponent, this.#filmsListComponent.element);
    this.#renderFilmCards(this.films, this.#filmsListContainerComponent.element, 5);

    render(new FilmsListShowMoreBtnView(), this.#filmsListComponent.element);

    render(this.#filmsListTopRatedComponent, this.#filmsComponent.element);
    render(this.#filmsListTopRatedContainerComponent, this.#filmsListTopRatedComponent.element);
    this.#renderFilmCards(this.films, this.#filmsListTopRatedContainerComponent.element, 2);

    render(this.#filmsListTopCommentedComponent, this.#filmsComponent.element);
    render(this.#filmsListTopCommentedContainerComponent, this.#filmsListTopCommentedComponent.element);
    this.#renderFilmCards(this.films, this.#filmsListTopCommentedContainerComponent.element, 2);
  }
}
