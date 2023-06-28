const build = require("./.cybercloud/build/build-plugin");

module.exports = build(process.env.NODE_ENV);
