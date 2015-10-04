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
      $.ajaxSetup({
        xhrFields: {
            mozSystem: true
          }
      });
      this.setProxy();
      this.getNode().then(function() {
        App.getCredentials().then(function () {
          App.routes.init();
        });
      });
    },
    setProxy: function() {
      $.ajax({
        url: 'config.json',
        async: false,
        context: App,
        beforeSend: function(xhr){
          if (xhr.overrideMimeType)
          {
            xhr.overrideMimeType("application/json");
          }
        },
        dataType: 'JSON',
        success:function(data) {
          this.proxy = data.proxy;
          localforage.setItem('proxy', data.proxy);
        },
        error: function(error) {
          console.log(error);
        }
      });
    },
    setNode: function(node) {
      this.node = node;
      localforage.setItem('node', node);
    },
    setCredentials: function(credentials) {
      this.credentials = credentials;
      localforage.setItem('credentials', credentials);
    },
    getCredentials: function() {
      if (this.credentials === null)  {
        return localforage.getItem('credentials', function(err, res){
          if (err) {

          }else {
            App.credentials = res;
          }
        });
      }
      return this.credentials;
    },
    getProxy: function() {
      if (this.proxy === null)  {
        localforage.getItem('proxy', function(err, res){
          if (err) {
            App.setProxy();
          }else {
            App.proxy = res;
          }
        });
      }
      return App.proxy;
    },
    getNode: function() {
      return localforage.getItem('node', function(err, value) {
        if(value) {
          return App.node = value;
        }else {
          return App.node = null;
        }
      });
    },
  }
})(Routes, User);
