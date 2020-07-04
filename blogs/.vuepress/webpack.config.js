const path = require('path')

module.exports = {
    resolve: {
        alias: {
            '@project': path.join(__dirname, '../../')
        }
    },
    devServer: {
        port: 8080,
        host: '0.0.0.0'
    }
}
