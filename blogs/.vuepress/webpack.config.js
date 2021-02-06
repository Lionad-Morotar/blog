const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    resolve: {
        alias: {
            '@project': path.join(__dirname, '../../')
        }
    },
    // plugins: [
    //     new CompressionPlugin({
    //         test: /(css|js)$/i
    //     })
    // ]
    // optimization: {
    //     splitChunks: {
    //         minSize: 30 * 1000,
    //         maxSize: 256 * 1000
    //     }
    // }
}
