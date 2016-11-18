import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';
import {Config} from "../core/Config";
import {LikeService} from "../common/LikeService";
import {ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class PollService {
  LIMIT = Config.PAGE_LIMIT;

  constructor(private api:ApiService, private _like:LikeService) {
  }

  get({where, limit = this.LIMIT, order = "", skip = 0, fields = {}}) {
    let filter = JSON.stringify({where: where, order: order, skip: skip, limit: limit, fields: fields});
    return this.api.request('get', 'polls', {filter: filter})
      .do((data) => {
        this._like.requestLikesInfo(data.map(model => model.id));
      });
  }
  count(where={}) {
    let filter = JSON.stringify(where);
    return this.api.request('get', 'polls/count', {where:filter});
  }
  createPoll(poll) {
    return this.api.request('post', 'polls', poll);
  }
  addToCandidates(pollId) {
    return this.api.request('post', `polls/${pollId}/candidate`);
  }
  removeFromCandidates(pollId) {
    return this.api.request('delete', `polls/${pollId}/candidate`);
  }
  closePoll(pollId) {
    return this.api.request('put', `polls/${pollId}/status/close`);
  }
  activatePoll(pollId) {
    return this.api.request('put', `polls/${pollId}/status/active`);
  }
  deletePoll(pollId) {
    return this.api.request('put', `polls/${pollId}/status/delete`);
  }
  denyPoll(pollId) {
    return this.api.request('put', `polls/${pollId}/status/deny`);
  }
  exists(pollId) {
    return this.api.request('get', `polls/${pollId}/exists`);
  }
  updatePoll(pollId,data) {
    return this.api.request('put', `polls/${pollId}`,{data:data})
  }
}
