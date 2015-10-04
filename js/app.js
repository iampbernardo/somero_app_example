var App = (function(Routes, User) {
  var Routes = Routes;
  return {
    user: User,
    controllers: {},
    views: {},
    routes: Routes,
    credentials: null,
    proxy: null,
    node: null,
    config: {},
    init: function() {
      this.setProxy();
      this.routes.init();
    },
    setProxy: function() {
      $.ajax({
        url: 'config.json',
        async: false,
        context: App,
        success:function(data) {
          this.proxy = data.proxy;
          console.log(this);
        },
        error: function(error) {
          console.log(error);
        }
      });
    },
    getProxy: function() {
      return this.proxy;
    }
  }
})(Routes, User);
