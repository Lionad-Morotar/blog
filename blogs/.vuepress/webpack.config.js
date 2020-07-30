const path = require('path')

// const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    resolve: {
        alias: {
            '@project': path.join(__dirname, '../../')
        }
    },
    devServer: {
        port: 8080,
        host: '0.0.0.0'
    },
    plugins: [
        // new CompressionPlugin({
        //     test: /(css|js)$/i
        // })
    ]
    // optimization: {
    //     splitChunks: {
    //         minSize: 30 * 1000,
    //         maxSize: 256 * 1000
    //     }
    // }
}
