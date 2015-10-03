var Routes = (function(jQuery, Handlebars, User){
  return {
    init: function() {
      var indexRoute = crossroads.addRoute('/', function(){

      });

      var loginRoute = crossroads.addRoute('/login', function(){
        var source   = $("#login-template").html();
        var template = Handlebars.compile(source);
        $("#content").html(template);
      });

      var indexRoute = crossroads.addRoute('/index', function(){
        jQuery(function(){
          User.getPublicTimeline();
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
})(jQuery, Handlebars, User);
