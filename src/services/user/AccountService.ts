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

  payment(fromId, toId, amount) {
    return this.api.request('post', 'accounts/payment', {fromId, toId, amount});
  }

  //user withdrew money
  withdraw(userId, amount) {
    return this.payment(userId, 0, amount);
  }

  getTransactions(userId) {
    return this.api.request('get', `accounts/${userId}/transactions`);
  }
}
