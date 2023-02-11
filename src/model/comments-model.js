import Observable from '../framework/observable.js';
import { COMMENTS_MODEL_ACTIONS } from '../const.js';

export default class CommentsModel extends Observable {
  #filmComments = [];
  #filmsApiService = null;

  constructor({ filmsApiService }) {
    super();

    this.#filmsApiService = filmsApiService;
  }

  async getFilmComments(filmId) {
    try {
      this.#filmComments = await this.#filmsApiService.getFilmComments(filmId);
    } catch(err) {
      this.#filmComments = [];
    }

    this._notify(COMMENTS_MODEL_ACTIONS.INIT, this.#filmComments);
  }

  async updateComments(action, commentData) {
    let response = null;
    let status = null;

    switch (action) {
      case COMMENTS_MODEL_ACTIONS.CREATE:
        response = await this.#createComment(commentData);
        break;

      case COMMENTS_MODEL_ACTIONS.DELETE:
        status = await this.#deleteComment(commentData);

        if (status) {
          response = await this.#filmsApiService.getFilmComments(commentData.filmId);
        }
        break;
    }

    this._notify(action, response);
  }

  async #deleteComment({ commentId }) {
    try {
      return await this.#filmsApiService.deleteComment({ commentId });
    } catch (error) {
      // Error
    }
  }

  async #createComment({ filmId, commentText, commentEmojiName }) {
    try {
      return await this.#filmsApiService.createComment({
        comment: {
          comment: commentText,
          emotion: commentEmojiName
        },
        filmId
      });
    } catch (error) {
      // Error
    }
  }
}
