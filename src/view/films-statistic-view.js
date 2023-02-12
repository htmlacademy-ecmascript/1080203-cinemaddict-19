import AbstractView from '../framework/view/abstract-view.js';

function createFilmsStatisticTemplate() {
  return `
    <section class="footer__statistics">
        <p></p>
    </section>
  `;
}

export default class FilmsStatisticView extends AbstractView {
  constructor({ getFilms }) {
    super();

    getFilms().then((films) => (this.#setFilmsCount(films.length)));
  }

  get template() {
    return createFilmsStatisticTemplate();
  }

  #setFilmsCount = (filmsCount) => {
    const statisticElerment = this.element.querySelector('.footer__statistics > p');
    statisticElerment.textContent = `${filmsCount} movies inside`;
  };
}
