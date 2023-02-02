import Observable from '../framework/observable.js';
import { commentsMock } from '../mock/comments-mock.js';
import { copyArrayAndLimitLength } from '../utils.js';

export default class CommentsModel extends Observable {
  #comments = copyArrayAndLimitLength(commentsMock, 0);

  getComments = () => this.#comments;

  deleteComment = ({ commentId }) => {
    this.#comments.find((comment, index, array) => {
      if (commentId === comment.id) {
        array.splice(index, 1);
        return array; // Без return выдаёт ошибку
      }
    });
  };
}
