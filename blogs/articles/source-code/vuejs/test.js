const fs = require('fs')
const path = require('path')
 
/* Atomics */

String.prototype.use = 
Array.prototype.use = function (fn) {
  return fn.call(this, this)
}

Array.prototype.groupBy = function (checkGroup) {
  return this.reduce((h, c, i) => {
    const last = h[h.length - 1]
    checkGroup(c, i, h)
      ? last
        ? last.push(c)
        : h.push([c])
      : h.push([c])

    return h
  }, [])
}

const normalizeLineSep = s => (s || '').trim().replace(/\r+\n+|\r+|\n+/g, '\r\n').replace(/(\r\n)+/g, '\n')
const notEmpty = s => s && !(/^(\r+|\n+|\r+\n+)$/.test(s))
const countLen = len => (_, i) => {
  return (i % len) === (len - 1)
}

/* Main */

const logsBuf = (fs.readFileSync(__dirname + path.sep + 'git-log-test.txt', 'utf-8')).toString()

const lineSep = '\n'
const logsByLine = logsBuf
  .use(normalizeLineSep)
  .split(/(commit\s+[0-9a-zA-Z]+)(\n)/g)
  .filter(notEmpty)
  .groupBy(countLen(2))
  .map(x => x
    .join(lineSep)
    .split(lineSep)
    .filter(notEmpty)
    .map(x => ''.trim.call(x))
    .reverse())
  .reverse()

const res = logsByLine

console.log(res)