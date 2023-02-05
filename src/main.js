import UserTitleView from './view/user-title-view.js';
import FilmsStatisticView from './view/films-statistic-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import FilmsFilterModel from './model/filters-model.js';
import FilmsFilterPresenter from './presenter/films-filter-presenter.js';
import { render } from './framework/render.js';
import FilmsApiService from './films-api-service.js';

const AUTHORIZATION = 'Basic ytgr5466hy78fdsw'; // todo Перенести в константы
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict/'; // todo Перенести в константы


const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filmsModel = new FilmsModel({
  tasksApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});
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
