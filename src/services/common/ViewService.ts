import {Injectable} from '@angular/core';
import {ApiService} from "../core/ApiService";

@Injectable()
export class ViewService {
  constructor(private api:ApiService) {
  }

  post(id) {
    return this.api.request('post', 'views', {id: id}).publishLast().connect();
  }
}
