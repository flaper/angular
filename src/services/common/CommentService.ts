import {Injectable} from '@angular/core';
import {LikeService} from "./LikeService";
import {ApiService} from "../core/ApiService";
import {UserService} from "../core/UserService";

@Injectable()
export class CommentService {
  constructor(private api:ApiService, private _like:LikeService, private _user:UserService) {
  }

  getBySubjectId(subjectId) {
    if (!subjectId) throw 'Comment.getBySubjectId - subjectId required';
    return this.api.request('get', 'comments', {filter: JSON.stringify({where: {subjectId: subjectId}})})
      .do((data) => {
        //we need to know if current user able to add a "like"
        this._like.requestLikesInfo(data.map(model => model.id));
        this._user.requestIds(data.map(model => model.userId));
      });
  }

  last(subjectIds) {
    return this.api.request('get', 'comments/last', {ids: JSON.stringify(subjectIds)});
  }

  post(data) {
    return this.api.request('post', 'comments', data);
  }

  put(data) {
    return this.api.request('put', `comments/${data.id}`, data);
  }

  save(data) {
    return data.id ? this.put(data) : this.post(data);
  }

  del(subjectId) {
    if (!subjectId) throw 'Comment.del - subjectId required';
    return this.api.request('delete', `comments/${subjectId}`).publishLast().connect();
  }
}
