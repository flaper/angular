import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ApiService} from "../core/ApiService";
import {UserService} from "../core/UserService";

@Injectable()
export class SubscriptionService {
  LIMIT:number = 20;
  constructor(private api:ApiService, private _user:UserService) {
    //noinspection TypeScriptUnresolvedFunction
    _user.currentUserObservable.subscribe(() => {
      this._mySubscriptions = new Map<string, BehaviorSubject<boolean>>();
    })
  }

  //cache map
  private _mySubscriptions:Map<string, BehaviorSubject<boolean>> = new Map<string, BehaviorSubject<boolean>>();

  /**
   *
   * @param id - subjectId
   * @returns {any}
   */

 get({where, limit = this.LIMIT, order = "", skip = 0, fields = {}}) {
   let filter = JSON.stringify({where: where, order: order, skip: skip, limit: limit, fields: fields});
   return this.api.request('get', 'subscriptions', {filter: filter})
     .do((data) => {
       this.requestInfo(data.map(model => model.id));
     });
 }
  ifHasObservable(id) {
    if (!this._mySubscriptions.has(id)) {
      this._mySubscriptions.set(id, new BehaviorSubject(false));

      let where = {targetId: id, userId: this._user.currentUserId};
      this.api.request('get', 'subscriptions/count', {where: JSON.stringify(where)})
        .subscribe(result => this._mySubscriptions.get(id).next(!!result.count));
    }
    return this._mySubscriptions.get(id);
  }

  requestInfo(allIds) {
    let ids = allIds.filter(id => !this._mySubscriptions.has(id));
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._mySubscriptions.set(id, new BehaviorSubject(false));
      });

      //let's request for allIds to update cache if we need at least one
      let where = {userId: this._user.currentUserId, targetId: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'subscriptions', {filter: JSON.stringify(filter)})
        .subscribe(subscriptions => {
          subscriptions.forEach(sub => this._mySubscriptions.get(sub.targetId).next(true));
        })
    }
  }

  toggle(targetId) {
    let ob = this._mySubscriptions.get(targetId);
    if (ob) {
      ob.next(!ob.getValue());
    }
    return this.api.request('post', `subscriptions/toggle/${targetId}`);
  }

  count(where = null) {
    let data = {};
    if (where) {
      data['where'] = JSON.stringify(where);
    }
    return this.api.request('get', 'subscriptions/count', data).map(data => data.count);
  }

  getHistory(where, limit = 20, offset = 0){
    let filter = {order: 'created DESC', limit: limit, offset: offset};
    filter['where'] = where;
    return this.api.request('get', 'subscriptions/', {filter: JSON.stringify(filter)});
  }
}
