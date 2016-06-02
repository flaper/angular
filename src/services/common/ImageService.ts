import {Injectable} from '@angular/core';
import {Config} from "../core/Config";

@Injectable()
export class ImageService {
  IMAGE_UPLOAD_URL;

  constructor() {
    this.IMAGE_UPLOAD_URL = Config.API_URL + 'images';
  }
}
