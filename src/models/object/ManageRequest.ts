import {InitableModel} from "../core/InitableModel";

export class ManageRequest extends InitableModel {
  id:string;
  name:string;
  position:string;
  phone:string;
  email:string;
  created:Date;

  constructor({init: init = null}) {
    super({init});
    this.created = new Date(init.created);
  }
}
