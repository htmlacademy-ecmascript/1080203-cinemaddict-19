import UserTitlePresenter from './presenter/user-title-presenter.js';
import FilmsStatisticView from './view/films-statistic-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsFilterModel from './model/filters-model.js';
import FilmsFilterPresenter from './presenter/films-filter-presenter.js';
import { render } from './framework/render.js';
import FilmsApiService from './films-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filmsApiService = new FilmsApiService(END_POINT, AUTHORIZATION);
const filmsModel = new FilmsModel({ filmsApiService });
const userTitlePresenter = new UserTitlePresenter({ headerElement, filmsModel });
const commentsModel = new CommentsModel({ filmsApiService });
const filtersModel = new FilmsFilterModel();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: mainElement,
  filmsModel,
  commentsModel,
  filtersModel
});
const filmsFilterPresenter = new FilmsFilterPresenter({ filtersModel, filmsModel });

userTitlePresenter.init();

filmsFilterPresenter.init({ mainElement, filmsFilterPresenter });

filmsModel.init();

filmsPresenter.init();

render(new FilmsStatisticView({ getFilms: () => filmsModel.films() }), footerElement);
