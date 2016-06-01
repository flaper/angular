export class Config {
  static API_URL = 'http://api.flaper.org/api/';
  static API_SERVER_URL = 'http://api.flaper.org';
  static APP_URL = 'http://flaper.org';
  static SUCCESS_LOGIN_CALLBACK:Function = null;

  static Init(data) {
    let keys = ['API_URL', 'API_SERVER_URL', 'SUCCESS_LOGIN_CALLBACK', 'WEB_APP'];
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
