import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../core/ApiService';
import {FObject, DOMAINS} from "../../models/index";
import {ReplaySubject, Subject} from 'rxjs';
let _uniq = require('lodash/uniq');

@Injectable()
export class ObjectService {
  constructor(private api:ApiService, private router:Router) {
  }

  private _objectsObservableCache:Map<string, ReplaySubject<FObject>> = new Map<string, ReplaySubject<FObject>>();
  private _objectsCache:Map<string, FObject> = new Map<string, FObject>();

  getBySlug({slug, mainDomain, region = null}) {
    let query = {mainDomain, slug};
    if (region && region != 'undefined') {
      query['region'] = region;
    }
    return this.api.request('get', `objects/bySlug`, query)
      .map(data => new FObject({init: data}));
  }

  setObject(obj) {
    this._objectsCache.set(obj.id, obj);
    this._objectsObservableCache.get(obj.id).next(obj);
  }

  getById(id):Subject<FObject> {
    if (!this._objectsObservableCache.has(id)) {
      this._objectsObservableCache.set(id, new ReplaySubject<FObject>(1));
      this.api.request('get', `objects/${id}`)
        .subscribe(obj => this.setObject(obj));
    }
    return this._objectsObservableCache.get(id);
  }

  $getById(id):FObject {
    let obj = this._objectsCache.get(id);
    if (!obj) {
      this.getById(id);
    }
    return obj;
  }

  requestIds(allIds) {
    allIds = _uniq(allIds);
    let ids = allIds.filter(id => !this._objectsObservableCache.has(id));
    if (ids.length > 0) {
      ids.forEach((id) => {
        this._objectsObservableCache.set(id, new ReplaySubject<FObject>(1));
      });
      //let's request for allIds to update cache if we need at least one
      let where = {id: {inq: allIds}};
      let filter = {where: where};
      this.api.request('get', 'objects', {filter: JSON.stringify(filter)})
        .subscribe(objs => {
          objs.forEach(obj => this.setObject(obj));
        })
    }
  }

  getRouteById(id) {
    let obj = this.$getById(id);
    return obj ? ObjectService.getRoute(obj) : null;
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
    let params = [`/${obj.mainDomain}`, obj.slug];
    if (obj.mainDomain === DOMAINS.PLACES) {
      if (obj.region) {
        params = [params[0], obj.region, params[1]];
      }
    }
    return params;
  }


  navigateTo(obj, action = null) {
    let url = ObjectService.getUrl(obj);
    if (action) {
      url += '/' + action;
    }
    this.router.navigateByUrl(url);
  }
}
