import {Injectable} from '@angular/core';
import {User, UserExtra} from "../../models/index";
import {AuthService} from "./auth/AuthService";
import {ApiService} from './ApiService';
import {Subject, ReplaySubject} from 'rxjs';
let _uniq = require('lodash/uniq');

@Injectable()
export class UserService {
  currentUserId:string;
  currentUser:User;
  currentUserObservable:Subject<User>;

  constructor(private api:ApiService, auth:AuthService) {
    //noinspection TypeScriptUnresolvedFunction
    auth.currentUserObservable.subscribe((user) => {
      /*
       * Will be called two times during first login.
       * First time, when user restored from ls. Second time when we got data from server
       */
      let userChanged = this.currentUserId !== (user ? user.id : null);
      this.currentUser = user;
      this.currentUserId = user ? user.id : null;
      if (user) {
        this._setUser(user);
        if (userChanged) {
          this.requestUserExtra(user.id);
        }
      }
    });
    this.currentUserObservable = auth.currentUserObservable;
  }

  private _usersObservableCache:Map<string, ReplaySubject<User>> = new Map<string, ReplaySubject<User>>();
  private _usersCache:Map<string, User> = new Map<string, User>();

  isCurrentUser(user:User) {
    return this.currentUser && user && this.currentUser.id === user.id;
  }

  getById(id):Subject<User> {
    if (!this._usersObservableCache.has(id)) {
      this._usersObservableCache.set(id, new ReplaySubject<User>(1));
      this.api.request('get', `users/${id}`)
        .subscribe(user => this._setUser(user));
    }
    return this._usersObservableCache.get(id);
  }

  requestById(id, filter = null) {
    let data = filter ? {filter: JSON.stringify(filter)} : null;
    return this.api.request('get', `users/${id}`, data)
  }

  requestUserExtra(id) {
    let observable = this.api.request('get', `users/${id}/extra`);
    observable.subscribe(extra => {
      let user = this._usersCache.get(id);
      user.extra = new UserExtra({init: extra});
      this._setUser(user);
    });
    return observable;
  }

  requestIds(allIds) {
    allIds = _uniq(allIds);
    let ids = allIds.filter(id => !this._usersObservableCache.has(id));
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._usersObservableCache.set(id, new ReplaySubject<User>(1));
      });

      //let's request for allIds to update cache if we need at least one
      let where = {id: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'users', {filter: JSON.stringify(filter)})
        .subscribe(users => {
          users.forEach(user =>  this._setUser(user));
        })
    }
  }

  getUserIdentitiesById(id) {
    return this.api.request('get', `users/${id}/identities`)
  }

  get({where, order = "", offset = 0, fields = {}}) {
    let filter = JSON.stringify({where: where, order: order, offset: offset, fields: fields});
    return this.api.request('get', 'users', {filter: filter});
  }

  put(data) {

    return this.api.request('put', `users/${data.id}`, data);
  }

  count(where = null) {
    let data = {};
    if (where) {
      data['where'] = JSON.stringify(where);
    }
    return this.api.request('get', 'users/count', data).map(data => data.count);
  }

  private _setUser(data) {
    let user = data;
    let currentData = this._usersCache.get(user.id);
    if (currentData) {
      if (currentData.extra)
        user.extra = currentData.extra;
      if (currentData.roles)
        user.roles = currentData.roles;
    }
    this._usersCache.set(user.id, user);
    if (this.currentUserId === user.id) {
      AuthService.CacheCurrentUser(user);
      this.currentUser = user;
    }
    let observable = this._usersObservableCache.get(user.id);
    if (!observable) {
      observable = new ReplaySubject<User>(1);
      this._usersObservableCache.set(user.id, observable);
    }
    observable.next(user);
  }

}
