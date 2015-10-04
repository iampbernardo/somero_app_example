var User = (function(jQuery, Handlebars){
  'use strict';

  var homeTimelineUrl = '/api/statuses/home_timeline.json';
  var publicTimelineUrl = '/api/statuses/public_timeline.json';


  function getHomeTimeline() {
        $.ajax({
          url: App.getProxy() + App.node + homeTimelineUrl,
          method: 'GET',
          cache: false,
          dataType: "JSON",
          crossDomain: true,
          headers: {
            'Authorization': 'Basic ' + App.credentials
          },
        })
        .done(function(data){
          var source   = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var context = {statuses: data};

          $("#content").html(template(context));
        })
        .error(function(error) {
          return false;
      });
  }
  function getPublicTimeline() {
      $.getJSON( App.getProxy() + App.node + publicTimelineUrl )
        .done(function(data){
          var source   = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var context = {statuses: data};
          $("#content").html(template(context));
        })
        .error(function(error) {
          return false;
        });
  }

  return {
    getPublicTimeline: getPublicTimeline,
    getHomeTimeline: getHomeTimeline,
  }

})(jQuery, Handlebars);
