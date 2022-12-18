import {commentsMock} from '../mock/comments-mock.js';

export default class CommentsModel {

  comments = commentsMock;

  getComments() {
    return this.comments;
  }
}
