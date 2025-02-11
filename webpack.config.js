const path = require('path');

module.exports = {
    entry: './wwwroot/js/index.js',

    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'wwwroot/dist'),
        publicPath: '/',
    },
    
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'wwwroot'),
        },
        allowedHosts: 'all',
        port: 8080,
        host: '0.0.0.0',
        open: true,
        hot: true,
    },
    resolve: {
        extensions: ['.js'],
    },

    mode: 'development',
};
