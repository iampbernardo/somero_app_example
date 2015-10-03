var App = (function(Routes, User) {
  var Routes = Routes;
  return {
    user: User,
    controllers: {},
    views: {},
    routes: Routes,
    config: {},
    init: function() {
      this.routes.init();
    },
  }
})(Routes, User);
