import Observable from '../framework/observable.js';
import { COMMENTS_ACTIONS, COMMENTS_MODEL_ACTIONS } from '../const.js';

export default class CommentsModel extends Observable {
  #filmComments = [];
  #filmsApiService = null;

  constructor({ filmsApiService }) {
    super();

    this.#filmsApiService = filmsApiService;
  }

  async getFilmComments(filmId) {
    try {
      const filmComments = await this.#filmsApiService.getFilmComments(filmId);
      this.#filmComments = filmComments.map(this.#adaptCommentToClient);
    } catch(err) {
      this.#filmComments = [];
    }

    this._notify(COMMENTS_MODEL_ACTIONS.INIT, this.#filmComments);
  }

  updateComments = (action, commentData) => {
    switch (action) {
      case COMMENTS_ACTIONS.CREATE:
        this.#createComment(commentData);
        break;

      case COMMENTS_ACTIONS.DELETE:
        this.#deleteComment(commentData);
        break;
    }

    this._notify(COMMENTS_MODEL_ACTIONS.UPDATE, this.#filmComments);
  };

  #deleteComment = ({ commentId }) => {
    this.#filmComments = this.#filmComments.filter((comment) => commentId !== comment.id);
  };

  #createComment = ({ commentId, commentText, commentEmojiName }) => {
    this.#filmComments.push({
      id: commentId,
      author: 'Random author',
      comment: commentText,
      date: '2019-05-11T16:12:32.554Z',
      emotion: commentEmojiName
    });
  };

  #adaptCommentToClient(comment) {
    return comment;
  }
}
