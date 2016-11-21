import {Injectable} from "@angular/core";
import {ApiService} from '../core/ApiService';

@Injectable()

export class SearchService {
  config:any = {
    host: "api.flaper.org",
    port: "80"
  };
  constructor(private _api:ApiService) {

  }
  search(query:string,region:string,domain:string):any {
    let filter:any = {
      where : {
        query:query
      }
    };
    if(domain) filter.where.domain = domain;
    if(region) filter.where.region = region;
    let filterString = JSON.stringify(filter);
    return this._api.request('get','Search',{filter:filterString});
  }
}
