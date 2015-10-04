/**
* Main app routes definitions
*/
var Routes = (function(jQuery, Handlebars, User, crossroads) {
  'use strict'

  return {
    init: function () {
      /**
      * Default route when enter the app
      */
      var defaultRoute = crossroads.addRoute('/', function () {

      });

      /**
      * Login actions
      */
      var loginRoute = crossroads.addRoute('/login', function(){
        var source   = $("#login-template").html();
        var template = Handlebars.compile(source);
        $("#content").html(template);

        $('#login-button').on('click', function(e) {
          e.preventDefault();
          var node = $('input[name="node"]').val().trim();
          var nickname = $('input[name="nickname"]').val().trim();
          var password = $('input[name="password"]').val().trim();
          var credentials = btoa(nickname + ":" + password);
          $.ajax({
            url: App.proxy + node + '/api/account/verify_credentials.json',
            method: 'GET',
            cache: false,
            dataType: "JSON",
            headers: {
              'Authorization': 'Basic ' + credentials
            },
          })
          .done(function(data) {
            App.setNode(node);
            App.setCredentials(credentials);
            localforage.setItem('user', data).then(function() {
              console.info('login info stored');
              hasher.setHash('home');
              crossroads.parse('/home');
            });
          })
          .fail(function(error) {
            alert('No se ha podido comprobar la identidad');
          });
        });
      });

      /**
      * Public timeline route
      */
      var indexRoute = crossroads.addRoute('/index', function(){
        jQuery(function(){
          User.getPublicTimeline();
        });
      });

      /**
      * User timeline
      */
      var indexRoute = crossroads.addRoute('/home', function(){
        jQuery(function(){
          User.getHomeTimeline();
        });
      });

      /**
      * Post a message route
      */
      var postRoute = crossroads.addRoute('/post', function(){
        var source   = $("#post-template").html();
        var template = Handlebars.compile(source);
        $("#content").html(template);


        $('#post-button').on('click', function(e) {
        var msg = $('textarea[name="post-text"]').val();
          $.ajax({
            url: App.getProxy() + App.node + '/api/statuses/update.json',
            method: 'POST',
            data:
            {
              status: msg
            },
            headers: {
              'Authorization': 'Basic ' + App.getCredentials()
            },
            success: function(data) {
              console.log(data);
            },
            error: function(error) {
              console.log(error);
            }
          });
        });
      });

      /**
      * Logout and close all data
      */
      var indexRoute = crossroads.addRoute('/exit', function(){
        jQuery(function(){
          localforage.clear();
          hasher.setHash('login');
          crossroads.parse('/login');
        });
      });

      function parseHash(newHash, oldHash){
        crossroads.parse(newHash);
      }

      hasher.initialized.add(parseHash);
      hasher.changed.add(parseHash);
      hasher.init();
    }
  }
})(jQuery, Handlebars, User, crossroads);
