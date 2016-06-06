import {InitableModel} from "../../core/InitableModel";

export class UserExtra extends InitableModel {
  premiumSupport;
  objects:Array<string>;

  constructor({init = null}) {
    super({init});
  }

  hasPremiumSupport() {
    return this.premiumSupport && this.premiumSupport > (new Date().toISOString());
  }
}
