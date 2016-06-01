import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';

@Injectable()
export class StoryService {
  constructor(private api:ApiService) {
  }


  count(where = null) {
    let data = {};
    if (where) {
      data['where'] = JSON.stringify(where);
    }
    return this.api.request('get', 'stories/count', data).map(data => data.count);
  }
}
