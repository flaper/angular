import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';
import {ManageRequest} from "../../models/object/ManageRequest";
import {ObjectService} from "./ObjectService";

@Injectable()
export class ManageRequestService {

  constructor(private api:ApiService, private _object:ObjectService) {
  }

  get({where, order = "", offset = 0}) {
    let filter = JSON.stringify({where: where, order: order, offset: offset});
    return this.api.request('get', 'ManageRequests', {filter: filter})
      .map(rows => rows.map(row => new ManageRequest({init: row})))
      //request objects
      .do(requests => this._object.requestIds(requests.map(r => r.subjectId)))
  }

  getBySubjectId(subjectId) {
    return this.get({where: {subjectId: subjectId}}).map(data => data.length ? data[0] : null)
  }

  post(data) {
    return this.api.request('post', 'ManageRequests', data);
  }

  del(id) {
    return this.changeStatus(id, 'delete');
  }

  approve(id) {
    return this.changeStatus(id, 'approve');
  }

  deny(id) {
    return this.changeStatus(id, 'deny');
  }

  private changeStatus(id, action) {
    let observable = this.api.request('put', `ManageRequests/${id}/status/${action}`).publishLast();
    observable.connect();
    return observable;
  }
}
