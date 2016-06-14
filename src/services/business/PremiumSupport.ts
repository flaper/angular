import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';

@Injectable()
export class PremiumSupport {
  constructor(private api:ApiService) {
  }

  getDialogs() {
    return this.api.request('get', 'SupportMessages/dialogs');
  }

  getDialog(userId) {
    return this.api.request('get', `SupportMessages/dialogs/${userId}`);
  }

  /**
   * @param toId if equal to 0 means message to our support team, in other case clientId should be here
   * @param message
   * @returns {*}
   */
  post({toId, message}) {
    let data = {toId: toId.toString(), message};
    return this.api.request('post', 'SupportMessages', data);
  }

  del(id) {
    return this.api.request('delete', `SupportMessages/${id}`).publishLast().connect();
  }
}
