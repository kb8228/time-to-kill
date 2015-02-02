var key = require("./yelp_key.js");
var q = require('q');
var yelpConnection = require("yelp").createClient(key);

///////////////////////////////////////////////////////
// yelp
exports.yelp = function (time, location, callback) {
  // walking speed - 5000 meter per hour, divided by 2 to account for return time
  var meters = (time * 5000) / 2;
  console.log("Searching for locations around zip", location, "reachable in", time/2, "hour(s) (", meters, "meters walking)");    // logging

  var options = {
    location: location,
    radius_filter: meters,
    category_filter: 'bars',
    limit: 20,
    offset: 0,
    sort: 1
  };

  var deferred = q.defer();
  yelpConnection.search(options, function(err, test) {
    if(err) {
      deferred.reject(new Error(err));
    }
    else {
      deferred.resolve(test);
    }
  });
  return deferred.promise;
};
