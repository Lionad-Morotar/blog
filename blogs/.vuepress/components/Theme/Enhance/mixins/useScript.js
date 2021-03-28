/** @file 控制台打开时的彩带效果 */

module.exports = function(url) {
  return {
    async mounted() {
      await this.$utils.loadScriptFromURL(url)
    }
  }
}
