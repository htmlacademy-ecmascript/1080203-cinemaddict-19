import Observable from '../framework/observable.js';
import { commentsMock } from '../mock/comments-mock.js';
import { copyArrayAndLimitLength } from '../utils.js';
import { COMMENTS_ACTIONS } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = copyArrayAndLimitLength(commentsMock, 0);

  getComments = () => this.#comments;

  updateComments = (action, commentData) => {
    switch (action) {
      case COMMENTS_ACTIONS.CREATE:
        this.#createComment(commentData);
        break;

      case COMMENTS_ACTIONS.DELETE:
        this.#deleteComment(commentData);
        break;
    }

    this._notify(action, this.#comments);
  };

  #deleteComment = ({ commentId }) => {
    this.#comments = this.#comments.filter((comment) => commentId !== comment.id);
  };

  #createComment = ({ commentId, commentText, commentEmojiName }) => {
    this.#comments.push({
      id: commentId,
      author: 'Random author',
      comment: commentText,
      date: '2019-05-11T16:12:32.554Z',
      emotion: commentEmojiName
    });
  };
}
