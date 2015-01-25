/**
* Deps
*/
var request = require('request');
var _ = require('underscore');

_.mixin( require('underscore.deferred') );

var helpers = require('./modules/helpers');
var builder = require('./modules/builder');
var path = require('path');

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
* Random strings
*/

var randomStrings = [
    '"Quiero sexo indecente, lo suficiente prendida en fuego, tu boca es aguardiente"',
    '"Empieza a bailar el movimiento original no pares, no me dejes con las ganas"',
    '"Algo que tú tienes me está controlando te estoy alucinando"'
];

/**
* Get quote
*/

function getQuote() {
    var defer = new _.Deferred();

    var lyricsURL = 'http://api.lyricsnmusic.com/songs?api_key=',
        artistParameter = '&artist=' + helpers.choice(config.content.artists),
        fullURL = lyricsURL + config.lyricsAPI + artistParameter,
        chosenQuote;

    request(fullURL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            chosenQuote = helpers.choice(JSON.parse(body)).snippet;
        } else {
            chosenQuote = 'Isto é unha cadea de proba \n para cando non haia \n resultados da busca';
        }

        var cleanedQuote = chosenQuote.replace(/\r/gm, '').split('\n');

        var finalQuote = '';

        _.each(cleanedQuote, function(part, i) {
            if(part.length && finalQuote.length + part.length <= config.maxQuoteLength) {
                var initial = '';

                if(/[A-Z]/.test(part[0])) {
                    initial = '.';
                } else if (i !== 0) {
                    initial = ' ';
                }

                finalQuote += initial + part.trim() + ' ';
            }
        });

        console.log(finalQuote);
    });


    var person = helpers.choice(config.content.persons);

    defer.resolve({
        quote: helpers.choice(randomStrings),
        image: path.join(__dirname, config.image_folder + helpers.choice(person.images)),
  signature: person.signature
    });

    return defer.promise();
}


/**
* Generator
*/

function generate() {
    var defer = new _.Deferred();

    getQuote().done(function(result) {
        // builder(result, config).done(function(output) {
        //   defer.resolve(output);
        // });
    });

    return defer.promise();
}

/**
* Tweeter
*/

function tweet() {
    generate().then(function(myTweet) {
      console.log(myTweet);

    });
}

// Tweet every 60 minutes
// setInterval(function () {
//   try {
//     tweet();
//   }
//   catch (e) {
//     console.log(e);
//   }
// }, 1000 * 60 * 60);

// Tweet once on initialization
tweet();
