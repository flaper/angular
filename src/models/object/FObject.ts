import {InitableModel} from "../core/InitableModel";
import {DOMAINS} from '../common/Domain';
import {ObjectService} from "../../services/object/ObjectService";

export class FObject extends InitableModel {
  id:string;
  title:string;
  slug:string;
  reviewsNumber:number;
  mainDomain:string;
  rating:number;
  region:string;
  fields:Array<any>;
  flap:any;

  constructor({init: init = null}) {
    super({init});
  }

  isPlace() {
    return this.mainDomain === DOMAINS.PLACES;
  }
  getRating() {
    let rule = !this.flap || !this.flap.reviewsNumber || (this.reviewsNumber >= 0.2 * this.flap.reviewsNumber) ;
    return rule ? this.rating : this.flap.rating;
  }
  getReviewsNumber() {
    let rule = !this.flap || !this.flap.reviewsNumber || (this.reviewsNumber >= 0.2 * this.flap.reviewsNumber) ;
    return rule ? this.reviewsNumber : this.flap.reviewsNumber;
  }
  getAddress() {
    let res = "";
    let address = this.fields['address'];
    if (address) {
      let parts = [address.street, address.houseNumber, address.extra];
      parts = parts.filter(value => value);
      res = parts.join(', ');
    }
    return res;
  }

  getRoute() {
    return ObjectService.getRoute(this);
  }

  getImages({filterAvatar = false}={}) {
    let images = this.flap.images;
    if (filterAvatar) {
      let filterId = null;
      if (this.flap.avatar) {
        let matches = this.flap.avatar.match(/\/(\d+)_middle/);
        filterId = matches ? +matches[1] : null;
      }
      if (filterId) {

        images = images.filter(image => image != filterId);
      }
    }
    return images;
  }
}
