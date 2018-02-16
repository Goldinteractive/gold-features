define('featurify', [], function() {
  return function(dependencyList, callback, mappings) {
    require(['base'], function() {
      define('base.features',
          ['base'],
          function(base) {
              return base.features;
          }
      );
      var alteredDepList = [];
      var preloadDepList = [];
      dependencyList.forEach(function (dependency) {
        if (typeof dependency === 'string') {
          alteredDepList.push(dependency);
        } else {
          preloadDepList.push(dependency.path);
          alteredDepList.push(dependency.name);
        }
      });
      // TODO: consider require.config path
      require(preloadDepList, function() {
        require(alteredDepList, callback);
      });
    });
  }
});