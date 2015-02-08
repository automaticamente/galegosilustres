// Put your own Twitter App keys here. See README.md for more detail.

var path = require('path');

module.exports = {
    tweetInterval: 1000 * 60 * 60,
    oauth: {
        consumer_key:         '',
        consumer_secret:      '',
        token:         '',
        token_secret:  ''
    },
    lyricsAPI: '',
    imagesFolder: path.join(__dirname, 'source_images/'),
    fontFolder: path.join(__dirname, 'fonts'),
    outputFolder: path.join(__dirname, 'output/'),
    imageWidth: 500,
    textBackground: 'white',
    textStrokeColor: 'black',
    textStrokeWidth: 4,
    availableFonts: ['Trocchi-Regular', 'RobotoSlab-Bold', 'ArbutusSlab-Regular'],
    font: '24px',
    fontSignature: '18px',
    imageAlpha: 0.5,
    lineHeight: 28,
    maxQuoteLength: 85,
    content: require('./content'),
    extraHashtags: ''
};
