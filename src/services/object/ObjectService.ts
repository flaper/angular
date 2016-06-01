import {Injectable} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {ApiService} from '../core/ApiService';
import {FObject, DOMAINS} from "../../models/index";
import {ReplaySubject, Subject} from 'rxjs';
let _uniq = require('lodash/uniq');

@Injectable()
export class ObjectService {
  constructor(private api:ApiService, private router:Router) {
  }

  private _objectsCache:Map<string, ReplaySubject<FObject>> = new Map<string, ReplaySubject<FObject>>();

  getBySlug({slug, mainDomain, region = null}) {
    let query = {mainDomain, slug};
    if (region) {
      query['region'] = region;
    }
    return this.api.request('get', `objects/bySlug`, query)
      .map(data => new FObject({init: data}));
  }

  getById(id):Subject<FObject> {
    if (!this._objectsCache.has(id)) {
      this._objectsCache.set(id, new ReplaySubject<FObject>(1));
      this.api.request('get', `objects/${id}`)
        .subscribe(user => this._objectsCache.get(user.id).next(user));
    }
    return this._objectsCache.get(id);
  }

  requestIds(allIds) {
    allIds = _uniq(allIds);
    let ids = allIds.filter(id => !this._objectsCache.has(id));
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._objectsCache.set(id, new ReplaySubject<FObject>(1));
      });
      //let's request for allIds to update cache if we need at least one
      let where = {id: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'objects', {filter: JSON.stringify(filter)})
        .subscribe(objs => {
          objs.forEach(obj => this._objectsCache.get(obj.id).next(obj));
        })
    }
  }

  static getUrl(obj) {
    if (obj.mainDomain === DOMAINS.PLACES) {
      let url = obj.mainDomain + '/';
      if (obj.region) {
        url += obj.region + '/';
      }
      return url + obj.slug;
    } else {
      return obj.mainDomain + '/' + obj.slug;
    }
  }

  static getRoute(obj) {
    let params = {mainDomain: obj.mainDomain, slug: obj.slug};
    if (obj.mainDomain === DOMAINS.PLACES) {
      if (obj.region) {
        params['region'] = obj.region;
      }
    }
    return ['LayoutObject', params];
  }


  navigateTo(obj, action = null) {
    let url = ObjectService.getUrl(obj);
    if (action) {
      url += '/' + action;
    }
    this.router.navigateByUrl(url);
  }
}
