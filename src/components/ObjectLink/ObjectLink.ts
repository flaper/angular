import {Component, Input} from '@angular/core';
import {ObjectService} from "../../services/object/ObjectService";
import {FObject} from "../../models/object/FObject";
import {Config} from "../../services/core/Config";

@Component({
  selector: 'object-link',
  template: `
  <a href="{{href}}" *ngIf="obj">
    {{obj.title ? obj.title : obj.id}}
  </a>`
})
export class ObjectLink {
  @Input()
  id:string;

  obj:FObject;
  href:string;

  constructor(private _object:ObjectService) {
  }

  ngOnInit() {
    this._object.getById(this.id).subscribe(obj => {
      this.obj = obj;
      let url = ObjectService.getUrl(obj);
      let app = Config.APP_URL;
      this.href = `${app}/${url}`;
    });
  }
}
