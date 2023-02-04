import Observable from '../framework/observable.js';
import { commentsMock } from '../mock/comments-mock.js';
import { copyArrayAndLimitLength } from '../utils.js';
import { COMMENTS_ACTIONS } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = copyArrayAndLimitLength(commentsMock, 0);

  getComments = () => this.#comments;

  updateComments = (commentData) => {
    switch (commentData.action) {
      case COMMENTS_ACTIONS.CREATE:
        this.#createComment({
          id: commentData.id,
          commentEmojiName: commentData.commentEmojiName,
          commentText: commentData.commentText
        });
        break;

      case COMMENTS_ACTIONS.DELETE:
        this.#deleteComment(commentData.commentId);
        break;
    }

    this._notify(commentData.action, this.#comments);
  };

  #deleteComment = (commentId) => {
    this.#comments.find((comment, index, array) => {
      if (commentId === comment.id) {
        array.splice(index, 1);
        return array;
      }
    });
  };

  #createComment = ({ id, commentEmojiName, commentText }) => {
    this.#comments.push({
      'id': id,
      'author': 'Random author',
      'comment': commentText,
      'date': '2019-05-11T16:12:32.554Z',
      'emotion': commentEmojiName
    });
  };
}
