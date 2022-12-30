import UserTitleView from './view/user-title-view.js';
import NavigationView from './view/navigation-view.js';
import FilmsStatisticView from './view/films-statistic-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentsModel from './model/comments-model.js';
import { render } from './render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filmsModel = new FilmsModel();
const commentsModel = new CommentsModel();
const filmsPresenter = new FilmsPresenter({
  filmsContainer: mainElement,
  filmsModel,
  commentsModel
});

render(new UserTitleView(), headerElement);
render(new NavigationView(), mainElement);

filmsPresenter.init();

render(new FilmsStatisticView(), footerElement);
