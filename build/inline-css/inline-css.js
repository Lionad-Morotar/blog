const fs = require('fs')
const path = require('path')
const inlineCss = require('inline-css')

const html = fs.readFileSync(path.join(__dirname, './html.html')).toString()

const options = {
    url: ' '
}

inlineCss(html, options).then(function(html) {
    fs.writeFileSync(path.join(__dirname, './output.html'), html)
})
