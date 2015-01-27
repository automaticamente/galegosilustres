// Put your own Twitter App keys here. See README.md for more detail.
module.exports = {
    tweetInterval: 1000 * 60 * 60,
    oauth: {
        consumer_key:         '',
        consumer_secret:      '',
        token:         '',
        token_secret:  ''
    },
    lyricsAPI: '',
    image_folder: 'source_images/',
    output_folder: 'output/',
    imageWidth: 500,
    textBackground: 'white',
    textStrokeColor: 'black',
    textStrokeWidth: 4,
    font: 'bold 24px Sans Serif',
    fontSignature: '16px Sans Serif',
    imageAlpha: 0.5,
    lineHeight: 28,
    maxQuoteLength: 85,
    content: require('./content')
};
