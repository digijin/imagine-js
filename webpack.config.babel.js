import path from 'path';

module.exports = {
    entry: "./src/imagine.js",
    output: {
        path: path.join(__dirname, 'lib'),
        filename: "imagine.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
              test: '/\.js?$/',
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                presets: ['es2015']
              }
            }
        ]
    }
};
