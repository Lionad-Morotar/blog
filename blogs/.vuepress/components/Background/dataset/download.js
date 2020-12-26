const fs = require('fs')
const fetch = require('request')
const path = require('path')
const putTo = path.join('./download')

const doubanData = require('./douban')
const images = doubanData.map(x => ({
  url: x.imageURL,
  name: x.imageURL.match(/[^/]*$/)[0]
}))

async function sleep(time = 1000) {
  return await new Promise(resolve => setTimeout(resolve, time))
}

function downloadURL(url, name) {
  fetch(url).pipe(fs.createWriteStream(path.join(putTo, name)))
}

async function downloadNext(images) {
  await sleep()
  const img = images.pop()
  const { url, name } = img
  downloadURL(url, name)
  images.length && await downloadNext(images)
}

downloadNext(images)
