const fs = require('fs')
const path = require('path')
const purify = require('purify-css')

const contentBuffer = fs.readFileSync(path.join(__dirname, './css-tree-shaking/html.html'))
const cssBuffer = fs.readFileSync(path.join(__dirname, './css-tree-shaking/css.css'))

var content = String(contentBuffer)
var css = String(cssBuffer)

let options = {
    output: './output.css'
}

purify(content, css, options)
