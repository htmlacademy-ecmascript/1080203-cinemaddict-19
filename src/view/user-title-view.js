import AbstractView from '../framework/view/abstract-view.js';
import { render } from '../framework/render.js';
import { USER_TITLE } from '../const.js';

function createUserTitleTemplate() {
  return `
    <section class="header__profile profile">
      <p class="profile__rating"></p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>
  `;
}

export default class UserTitleView extends AbstractView {
  #currentUserTitle = null;
  #newUserTitle = null;
  #userTitleElement = this.element.querySelector('.profile__rating');

  constructor() {
    super();
  }

  get template() {
    return createUserTitleTemplate();
  }

  render = ({ watchedFilmsCount, headerElement }) => {
    this.#currentUserTitle = this.#getUserTitle(watchedFilmsCount);

    render(this, headerElement);

    this.#setUserTitle(this.#currentUserTitle);
  };

  changeUserTitle = (count) => {
    this.#newUserTitle = this.#getUserTitle(count);

    if (this.#currentUserTitle !== this.#newUserTitle) {
      this.#currentUserTitle = this.#newUserTitle;

      this.#setUserTitle(this.#currentUserTitle);
    }
  };

  #getUserTitle = (count) => {
    let userTitle = '';

    switch (true) {
      case count === 0:
        break;
      case count >= 1 && count <= 10:
        userTitle = USER_TITLE.NOVICE;
        break;
      case count >= 11 && count <= 20:
        userTitle = USER_TITLE.FAN;
        break;
      case count >= 21:
        userTitle = USER_TITLE.MOVIE_BUFF;
        break;
    }

    return userTitle;
  };

  #setUserTitle = (userTitle) => {
    this.#userTitleElement.textContent = userTitle;
  };
}
