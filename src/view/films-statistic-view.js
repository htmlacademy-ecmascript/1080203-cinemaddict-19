import AbstractView from '../framework/view/abstract-view.js';

function createFilmsStatisticTemplate() {
  return `
    <section class="footer__statistics">
        <p>130 291 movies inside</p>
    </section>
  `;
}

export default class FilmsStatisticView extends AbstractView {
  get template() {
    return createFilmsStatisticTemplate();
  }
}
