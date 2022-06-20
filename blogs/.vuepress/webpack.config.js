const path = require('path')

const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
    module: {
        rules: [
            {
                test: /.txt$/,
                use: [{
                    loader: 'raw-loader'
                }]
            }
        ],
    },
    resolve: {
        alias: {
            '@project': path.join(__dirname, '../../'),
            '@interview': path.join(__dirname, '../interview')
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
