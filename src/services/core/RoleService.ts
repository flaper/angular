import {Injectable} from '@angular/core';
import {ApiService} from '../core/ApiService';

@Injectable()
export class RoleService {
  constructor(private api:ApiService) {
  }

  get() {
    return this.api.request('get', 'roles');
  }

  post(userId, roleName) {
    return this.api.request('post', `users/${userId}/roles`, {role: roleName});
  }

  del(userId) {
    return this.api.request('delete', `users/${userId}/roles`);
  }
}
