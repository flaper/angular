import {InitableModel} from "../core/InitableModel";

export class User extends InitableModel {
  id:string;
  displayName:string;
  roles:string[];
  photo:string;
  photoLarge:string;
  created:Date;
  updated:Date;

  constructor({init: init = null}) {
    super({init});
    this.created = new Date(init.created);
    this.updated = new Date(init.updated);
  }
}
