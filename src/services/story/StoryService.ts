import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';
import {Config} from "../core/Config";
import {LikeService} from "../common/LikeService";

@Injectable()
export class StoryService {
  LIMIT = Config.PAGE_LIMIT;

  constructor(private api:ApiService, private _like:LikeService) {
  }

  get({where, limit = this.LIMIT, order = "", skip = 0, fields = {}}) {
    let filter = JSON.stringify({where: where, order: order, skip: skip, limit: limit, fields: fields});
    return this.api.request('get', 'stories', {filter: filter})
      .do((data) => {
        this._like.requestLikesInfo(data.map(model => model.id));
      });
  }

  getAudit(storyId, query = {}) {
    return this.api.request('get',`stories/${storyId}/audit`,query);
  }

  getBySlug(slug) {
    let query = {slug: slug};
    return this.api.request('get', `stories/slug`, query);
  }

  post(data) {
    return this.api.request('post', 'stories', data);
  }

  put(data) {
    return this.api.request('put', `stories/${data.id}`, data);
  }

  save(data) {
    return data.id ? this.put(data) : this.post(data);
  }

  del(subjectId) {
    return this.changeStatus(subjectId, 'delete');
  }

  deny(subjectId) {
    return this.changeStatus(subjectId, 'deny');
  }

  private changeStatus(id, action) {
    if (!id) throw 'Story.changeStatus - subjectId required';
    let observable = this.api.request('put', `stories/${id}/status/${action}`).publishLast();
    observable.connect();
    return observable;
  }

  count(where = null) {
    let data = {};
    if (where) {
      data['where'] = JSON.stringify(where);
    }
    return this.api.request('get', 'stories/count', data).map(data => data.count);
  }
}
