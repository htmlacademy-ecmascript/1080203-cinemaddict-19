import UserTitleView from './view/user-title-view.js';
import FilmsStatisticView from './view/films-statistic-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsFilterModel from './model/filters-model.js';
import FilmsFilterPresenter from './presenter/films-filter-presenter.js';
import { render } from './framework/render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filtersModel = new FilmsFilterModel();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: mainElement,
  filmsModel,
  commentsModel,
  filtersModel
});
const filmsFilterPresenter = new FilmsFilterPresenter({ filtersModel, filmsModel });

render(new UserTitleView(), headerElement);

filmsFilterPresenter.init({ mainElement, filmsFilterPresenter });

filmsPresenter.init();

render(new FilmsStatisticView(), footerElement);
