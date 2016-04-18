var path = require('path');

module.exports = {
    entry: "./src/imagine.js",
    output: {
        path: path.join(__dirname, 'lib'),
        filename: "imagine.js"
    },
    module: {
        loaders: [
            {
              test: '/\.js/',
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            }
        ]
    }
};
