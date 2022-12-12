import UserTitleView from './view/user-title-view.js';
import NavigationView from './view/navigation-view.js';
import SortingView from './view/sorting-view.js';
import FilmsStatisticView from './view/films-statistic-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import {render} from './render.js';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const filmsPresenter = new FilmsPresenter({filmsContainer: mainElement});

render(new UserTitleView(), headerElement);
render(new NavigationView(), mainElement);
render(new SortingView(), mainElement);

filmsPresenter.init();

render(new FilmsStatisticView(), footerElement);
