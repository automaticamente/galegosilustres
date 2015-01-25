var request = require('request');
var _ = require('underscore');

_.mixin( require('underscore.deferred') );

var config;

try {
  config = require('./local.config.js');
} catch(e) {
  config = require('./config.js');
}

Array.prototype.pick = function() {
  return this[Math.floor(Math.random()*this.length)];
};

Array.prototype.pickRemove = function() {
  var index = Math.floor(Math.random()*this.length);
  return this.splice(index,1)[0];
};

function generate() {
  var dfd = new _.Deferred();

  dfd.resolve('hi');
  return dfd.promise();
}

function tweet() {
  generate().then(function(myTweet) {
      console.log(myTweet);


  });
}

// Tweet every 60 minutes
setInterval(function () {
  try {
    tweet();
  }
  catch (e) {
    console.log(e);
  }
}, 1000 * 60 * 60);

// Tweet once on initialization
tweet();
