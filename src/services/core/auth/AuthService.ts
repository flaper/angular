import {Injectable} from '@angular/core';
import {ApiService} from '../ApiService';
import {Subject, BehaviorSubject} from 'rxjs';
import {UrlService} from '../../utils/UrlService';
import {Location} from '@angular/common';
import {User} from "../../../models/index";
import {Config} from "../Config";

export interface AuthProvider {
  name: string
  loginTitle: string
  publicUrlTitle: string
  icon?: string
  authLink?: string
}
export let AUTH_PROVIDERS:AuthProvider[] = [
  {name: 'vk', loginTitle: 'Войти через Вконтакте', publicUrlTitle: 'ВКонтакте'},
  {name: 'mail', loginTitle: 'Войти через Mail.ru', publicUrlTitle: 'Mail.ru', icon: 'fa fa-at'},
  {name: 'odnoklassniki', loginTitle: 'Войти через Одноклассники', publicUrlTitle: 'Одноклассники'},
  {name: 'facebook', loginTitle: 'Войти через Facebook', publicUrlTitle: 'Facebook'},
  {name: 'google', loginTitle: 'Войти через Google', publicUrlTitle: 'Google Plus'},
];

function prepare() {
  let location:any = window.location;
  let cb = encodeURIComponent(location.origin);
  AUTH_PROVIDERS.forEach((provider:AuthProvider) => {
    provider.authLink = `${Config.API_SERVER_URL}/auth/${provider.name}?cb=${cb}`;
    provider.icon = provider.icon ? provider.icon : 'fa fa-' + provider.name;
  });
}
prepare();
Config.SubscribeToInit(prepare);


export interface JwtData {
  id:string;
  userId:string,
  created: Date,
  //seconds
  ttl: number
}

@Injectable()
export class AuthService {
  jwtData:JwtData;
  //don't use this, better use UserService.currentUserObservable
  currentUserObservable:Subject<User>;
  private currentUser = null;

  constructor(private api:ApiService, private location:Location) {
    this.currentUserObservable = new BehaviorSubject<User>(null);
    //first let's try to get jwt from URL, then from cache
    let params = UrlService.getSearchParameters();

    if (params['jwt']) {
      let jwtString = decodeURIComponent(params['jwt']);
      this.validateJwtAndRequestUser(jwtString);
      if (this.jwtData && Config.SUCCESS_LOGIN_CALLBACK) {
        Config.SUCCESS_LOGIN_CALLBACK();
      }
    }

    if (!this.jwtData) {
      this.parseJwtCache();
    }
  }

  static CacheCurrentUser(user) {
    ls.setItem('currentUser', JSON.stringify(user));
  }

  setCurrentUser(user) {
    AuthService.CacheCurrentUser(user);
    this.currentUser = user;
    //noinspection TypeScriptUnresolvedFunction
    this.currentUserObservable.next(new User({init: user}));
  }

  // login(data){
  //   return this.api.request('post', `users/login`, data);
  // }
  login(data){
    return this.api.request('post', 'users/login', data).subscribe(res => {
      this.validateJwtAndRequestUser(res.id);
    })
  }

  logout() {
    this._setJwtData(null);
    //we don't clear currentUser to make login process faster next time
    //noinspection TypeScriptUnresolvedFunction
    this.currentUserObservable.next(null);
  }

  parseJwtCache():boolean {
    let jwtString = ls.getItem('jwt');
    return this.validateJwtAndRequestUser(jwtString);
  }

  validateJwtAndRequestUser(jwtString:string):boolean {
    let valid = false;
    if (jwtString) {
      try {
        let jwt = JSON.parse(jwtString);
        jwt.created = new Date(jwt.created);
        let validTill = new Date(jwt.created.getTime() + jwt.ttl * 1000);
        if (jwt.userId && validTill > new Date()) {
          this._setJwtData(jwt);
          valid = true;
          this.setUserFromCache();
          this.requestUser();
        }
      }
      finally {
      }
    }
    return valid;
  }

  //can be called before requestUser to decrease app latency
  setUserFromCache() {
    let userJSON = ls.getItem('currentUser');
    if (userJSON) {
      try {
        let user = JSON.parse(userJSON);
        //if last user in the cache is the same as credential user
        if (this.jwtData.userId === user.id) {
          this.setCurrentUser(user);
        }
      }
      catch (e) {

      }
    }
  }

  requestUser() {
    let userId = this.jwtData.userId;
    let observer = this.api.request('get', `users/${userId}`, {filter: JSON.stringify({include: 'roles'})});
    observer.subscribe(user => {
        user.extra = this.currentUser ? this.currentUser.extra : {};
        this.setCurrentUser(user)
      },
      (error) => {
        //e.g. at stage server when record removed
        this.logout();
      }
    );

    return observer;
  }

  _setJwtData(jwtData) {
    this.jwtData = jwtData;
    if (jwtData) {
      ls.setItem('jwt', JSON.stringify(jwtData));
    } else {
      ls.removeItem('jwt');
    }
  }
}
