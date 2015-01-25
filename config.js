// Put your own Twitter App keys here. See README.md for more detail.
module.exports = {
    oauth: {
        consumer_key:         '',
        consumer_secret:      '',
        token:         '',
        token_secret:  ''
    },
    lyricsAPI: '',
    image_folder: 'source_images/',
    output_folder: 'output/',
    imageWidth: 440,
    textBackground: 'white',
    textStrokeColor: 'black',
    textStrokeWidth: 4,
    font: '20px Sans Serif',
    lineHeight: 22,
    maxQuoteLength: 100,
    content: require('./content')
};
