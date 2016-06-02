export class Config {
  static API_URL = 'http://api.flaper.org/api/';
  static API_SERVER_URL = 'http://api.flaper.org';
  static APP_URL = 'http://flaper.org';
  static PAGE_LIMIT = 20;
  static SUCCESS_LOGIN_CALLBACK:Function = null;

  static Init(data) {
    let keys = ['API_URL', 'API_SERVER_URL', 'APP_URL', 'PAGE_LIMIT', 'SUCCESS_LOGIN_CALLBACK'];
    keys.forEach(key => {
      if (data[key]) {
        Config[key] = data[key];
      }
    });
    while (Config.cbs.length > 0) {
      let cb = Config.cbs.shift();
      cb();
    }
  }

  static cbs:Array<Function> = [];

  static SubscribeToInit(cb) {
    Config.cbs.push(cb);
  }
}
