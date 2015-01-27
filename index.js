/**
* Deps
*/
var request = require('request');
var _ = require('underscore');

_.mixin( require('underscore.deferred') );

var helpers = require('./modules/helpers');
var builder = require('./modules/builder');
var path = require('path');
var fs = require('fs');

var DEBUG = true;

/**
* Configuration
*/

var config;

try {
    config = require('./local.config.js');
} catch(e) {
    config = require('./config.js');
}

/**
* Get quote
*/

function getQuote() {
    var defer = new _.Deferred();
    var person = helpers.choice(config.content.persons);

    var lyricsURL = 'http://api.lyricsnmusic.com/songs?per_page=100&api_key=',
        artistParameter = '&artist=' + helpers.choice(config.content.artists),
        fullURL = lyricsURL + config.lyricsAPI + artistParameter;

    var parseResponse = function(body) {
        var chosenQuote = helpers.choice(body).snippet.replace(/\r/gm, '').split('\n');

        chosenQuote.pop();

        var finalQuote = '';

        _.each(chosenQuote, function(part, i) {
            if(part.length && finalQuote.length + part.length <= config.maxQuoteLength) {
                var initial = '';

                part = part.trim();

                if(/[A-Z]/.test(part[0])) {
                    initial = '. ';
                } else if (i !== 0) {
                    initial = ', ';
                }

                finalQuote += (i !== 0 ? initial : '') + part;
            }
        });

        defer.resolve({
            quote: '"' + finalQuote + '"',
            image: path.join(__dirname, config.image_folder + helpers.choice(person.images)),
            signature: person.signature
        });
    };

    if(DEBUG) {
        parseResponse(config.content.debugContent);
    } else {
        request(fullURL, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                parseResponse(JSON.parse(body));
            } else {
                defer.reject(error);
            }
        });
    }

    return defer.promise();
}


/**
* Generator
*/

function generate() {
    var defer = new _.Deferred();

    getQuote().done(function(result) {
        builder(result, config).done(function(output) {
            result.output = output;
            defer.resolve(result);
        }).fail(function(err) {
            console.log('Image generation error', err);
        });
    }).fail(function(err){
        console.log('Lyric API error', err);
    });

    return defer.promise();
}

/**
* Tweeter
*/

function tweet() {
    generate().then(function(myTweet) {

        var status = myTweet.quote + ' ' + myTweet.signature;

        if(DEBUG) {
            console.log({
                status: status,
                statusLength: status.length,
                output: myTweet.output
            });

            return;
        }

        var params = {
            url: 'https://api.twitter.com/1.1/statuses/update_with_media.json',
            oauth: config.oauth
        };

        var r = request.post(params, function(err, response, body) {
            if(err) {
                throw err;
            }

            console.log(body);
        });

        var form = r.form();
        form.append('status', status);
        form.append('media[]', fs.createReadStream(myTweet.output));

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
