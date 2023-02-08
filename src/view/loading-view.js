import AbstractView from '../framework/view/abstract-view.js';
import { LOADING_MESSAGE } from '../const.js';

function createLoadingTemplate() {
  return `<h2 class="films-list__title">${LOADING_MESSAGE}</h2>`;
}

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
