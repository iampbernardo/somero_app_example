(function(){
  var indexRoute = crossroads.addRoute('/index', function(){
    console.log('Hey, here we are');
  });

  function parseHash(newHash, oldHash){
    crossroads.parse(newHash);
  }
  hasher.initialized.add(parseHash); //parse initial hash
  hasher.changed.add(parseHash); //parse hash changes
  hasher.init(); //start listening for history change

})();
