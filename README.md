# @galegosilustres (Galegos Ilustres)

This is a twitter bot that overlays random reggaeton lyrics on random pictures of historical figures from [Galicia](http://en.wikipedia.org/wiki/Galicia_%28Spain%29).

## Install

1. Clone this repo
2. Install Cairo (check the dependencies section in [this guides](https://github.com/Automattic/node-canvas/wiki#desktop)) and [Imagemagick](http://www.imagemagick.org/script/binary-releases.php) on your computer (if needed).
3. execute `npm install` to install all the dependencies
4. [Create an app in Twitter](https://apps.twitter.com/) with write permissions and grab the consumer and token keys. If you are creating a new Twitter account for this bot, do it on your phone so you do not have to verify your mobile number later to create the app.
5. Generate a [lyricsnmusic.com API key](http://www.lyricsnmusic.com/api_keys/new)
6. Copy config.js to local.config.js and fill it with your keys.
7. execute `node index.js` to start tweeting.
8. Hack the code if you want. You can use `grunt watch` to check in real time for javascript errors while you coding.

## License
Copyright (c) 2015 Berto Yáñez
Licensed under the MIT license.
