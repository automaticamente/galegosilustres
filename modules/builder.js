var _ = require('underscore');

_.mixin( require('underscore.deferred') );

var fs = require('fs');
var path = require('path');
var uuid = require('node-uuid');

var Canvas = require('canvas'),
    Image = Canvas.Image;

/**
* Returns a png image path
* @param {Object} object - Configuration object
*/
var makePNG = function (config, globalConfig) {
    console.log(globalConfig);
    var defer = new _.Deferred();

    var writePng = function(canvas) {
        var fileName = path.join(__dirname + '../../' + globalConfig.output_folder + uuid.v1() + '.png'),
            out = fs.createWriteStream(fileName),
            stream = canvas.pngStream();

        stream.on('data', function(chunk) {
            out.write(chunk);
        });

        stream.on('end', function() {
            defer.resolve(fileName);
        });
    };

    var drawStrokedText = function(context, text, x, y) {
        context.strokeStyle = globalConfig.textStrokeColor;
        context.lineWidth = globalConfig.textStrokeWidth;
        context.strokeText(text, x, y);
        context.fillStyle = globalConfig.textBackground;
        context.fillText(text, x, y);
    };

    var wrapText = function (context, text, signature, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth && n > 0) {
                drawStrokedText(context, line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        drawStrokedText(context, line, x, y);
        drawStrokedText(context, signature, x, y + lineHeight + (globalConfig.lineHeight / 2));
    };

    fs.readFile(config.image, function(err, imageFile) {
        if(err) {
            throw err;
        }

        var img = new Image();
        img.src = imageFile;

        var ratio = img.height / img.width;

        var resized = {
            width: globalConfig.imageWidth,
            height: globalConfig.imageWidth * ratio
        };

        var canvas = new Canvas(resized.width, resized.height),
            ctx = canvas.getContext('2d');

        ctx.drawImage(img, 0, 0, resized.width, resized.height);

        ctx.font = globalConfig.font;
        wrapText(ctx, config.quote, config.signature, 20, resized.height - 120, resized.width - 20, globalConfig.lineHeight);

        writePng(canvas);
    });

    return defer.promise();
};

module.exports = makePNG;