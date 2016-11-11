import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';
import {Config} from "../core/Config";
import {ReplaySubject, Subject} from 'rxjs';

@Injectable()
export class VoteService {
  LIMIT = Config.PAGE_LIMIT;

  constructor(private api:ApiService) {
  }
  getResults(id) {
    return this.api.request('get',`votes/${id}/results`)
  }
  voteExists(id) {
    return this.api.request('get', `votes/${id}/exists`)
  }
  voteFor(id,option) {

    return this.api.request('post', `votes/${id}`, {answer:option})
  }
  revokeVote(id) {
    return this.api.request('delete', `votes/${id}`);
  }
}
