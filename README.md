# @galegosilustres (Galegos Ilustres)

This is a twitter bot that puts random reggaeton lyrics over photos of historical figures from Galicia.

## Install

1. Clone this repo
2. Install Cairo ([check this guide](https://github.com/Automattic/node-canvas/wiki/Installation---Ubuntu-and-other-Debian-based-systems)) and [Imagemagick](http://www.imagemagick.org/script/binary-releases.php) on your computer.
3. execute `npm install`
4. [Create an app in Twitter](https://apps.twitter.com/) with write permissions and grab it's API keys. If you are creating a new twitter account for this bot, do it on your phone so you do not have to verify your mobile number later to create an app.
5. Generate a [lyricsnmusic.com API key](http://www.lyricsnmusic.com/api_keys/new)
6. Copy config.js to local.config.js and fill it with your keys.
7. execute `node index.js` to start tweeting.
8. Hack the code if you want. You can use `grunt watch` to check in real time for javascript errors while you coding.

## License
Copyright (c) 2015 Berto Yáñez
Licensed under the MIT license.
