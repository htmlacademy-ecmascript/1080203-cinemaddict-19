import UserTitleView from './view/user-title-view.js';
import NavigationView from './view/navigation-view.js';
import SortingView from './view/sorting-view.js';
import FilmsStatisticView from './view/films-statistic-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const filmsPresenter = new FilmsPresenter({filmsContainer: siteMainElement});

render(new UserTitleView(), siteHeaderElement);
render(new NavigationView(), siteMainElement);
render(new SortingView(), siteMainElement);

filmsPresenter.init();

render(new FilmsStatisticView(), siteFooterElement);
