import {UserExtra} from "./UserExtra";
import {InitableModel} from "../../core/InitableModel";

export class User extends InitableModel {
  id:string;
  displayName:string;
  roles:string[];
  photo:string;
  photoLarge:string;
  created:Date;
  updated:Date;
  extra:UserExtra = new UserExtra({init: {}});

  constructor({init = {}}) {
    super({init});
  }
}
