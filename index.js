/**
* Deps
*/
var path = require('path');
var fs = require('fs');
var request = require('request');
var _ = require('underscore');
_.mixin(require('underscore.deferred'));

var helpers = require('./modules/helpers');
var builder = require('./modules/builder');

var DEBUG = false;

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
    var font = helpers.choice(config.availableFonts);

    var lyricsURL = 'http://api.lyricsnmusic.com/songs?per_page=100&api_key=',
        artistParameter = '&artist=' + helpers.choice(config.content.artists),
        fullURL = lyricsURL + config.lyricsAPI + artistParameter;

    var parseResponse = function(body) {
        var chosenQuote = helpers.choice(body).snippet.split('\n');

        var finalQuote = _.chain(chosenQuote)
            .pop()
            .map(function(part) {
                return part.trim()
                    .replace(/^[\.,]+|[\.,]+$|\(.*\)|\[.*\]|\s+[\.,]\s+/g, '')
                    .replace(/\s+([.,!":])/g, '$1')
                    .trim();
            })
            .filter(function(part) {
                return part !== '';
            })
            .value()
            .join('. ');

        return defer.resolve({
            quote: finalQuote,
            image: path.join(config.imagesFolder, helpers.choice(person.images)),
            signature: person.signature,
            font: font
        });
    };

    if(DEBUG) {
        parseResponse(config.content.debugContent);
    } else {
        request(fullURL, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                parseResponse(JSON.parse(body));
            } else {
                defer.reject(error ? error : 'Timeout. Try again.');
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
            return defer.resolve(result);
        }).fail(function(err) {
            console.log('Image generation error: ', err);
        });
    }).fail(function(err){
        console.log('Lyric API error: ', err);
    });

    return defer.promise();
}

/**
* Tweeter
*/

function tweet() {
    generate().then(function(myTweet) {

        var maxLength = 117;

        var cutStatus = '"' + myTweet.quote.substring(0, maxLength - (myTweet.signature.length + 6)) + '..." ';

        var status = cutStatus + myTweet.signature;

        if(DEBUG) {
            console.log({
                debug: true,
                originalStatus: myTweet.quote,
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
if(!DEBUG) {
    setInterval(function () {
      try {
        tweet();
      }
      catch (e) {
        console.log(e);
      }
     }, config.tweetInterval);
}

// Tweet once on initialization
tweet();
