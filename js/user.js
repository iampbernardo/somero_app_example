var User = (function(jQuery, Handlebars){
  'use strict';

  var publicTimelineUrl = '/api/statuses/public_timeline.json'

  function getPublicTimeline() {
    var result = $.getJSON(
      'http://lamatriz.org' + publicTimelineUrl)
      .done(function(data){
        var source   = $("#entry-template").html();
        var template = Handlebars.compile(source);
        console.log(data);
        var context = {statuses: data};

        $("#content").html(template(context));
      })
      .error(function(error) {
        return false;
      });
  }

  return {
    getPublicTimeline: getPublicTimeline,
  }

})(jQuery, Handlebars);
