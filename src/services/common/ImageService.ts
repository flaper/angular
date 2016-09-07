import {Injectable} from '@angular/core';
import {Config} from "../core/Config";
import {ApiService} from "../core/ApiService";

@Injectable()
export class ImageService {
  IMAGE_UPLOAD_URL;

  constructor(private api:ApiService) {
    this.IMAGE_UPLOAD_URL = Config.API_URL + 'images';
  }

  get({where, limit = 20, order = "", skip = 0, fields = {}}){
    let filter = JSON.stringify({where: where, order: order, skip: skip, limit: limit, fields: fields});
    return this.api.request('get', 'images',{filter:filter});
  }
}
