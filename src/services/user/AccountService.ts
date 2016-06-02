import {Injectable} from '@angular/core';
import {ApiService} from "../core/ApiService";

@Injectable()
export class AccountService {
  constructor(private api:ApiService) {
  }

  getAmountById(id) {
    return this.api.request('get', `accounts/${id}`)
      .map(data => data['amount']);
  }
}
