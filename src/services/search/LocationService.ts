import {Injectable} from "@angular/core";
import {ApiService} from '../core/ApiService';

@Injectable()

export class LocationService {
  getCurrentDomain() {
    return ls.getItem('flaper-current-domain');
  }
  setCurrentDomain(domain) {
    ls.setItem('flaper-current-domain',domain);
  }
  getCurrentRegion() {
    return ls.getItem('flaper-current-region');
  }
  setCurrentRegion(region) {
    ls.setItem('flaper-current-region',region);
  }
}
