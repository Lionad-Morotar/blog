#!/usr/bin/env node

const fs = require('fs')
const cmd = require('node-cmd')
const path = require('path')
const OBS = require('esdk-obs-nodejs')

const { id, key } = require('./secrets/huaweiyun.js')
const obs = new OBS({
  access_key_id: id,
  secret_access_key: key,
  server: 'obs.cn-east-3.myhuaweicloud.com'
})

const enableRSS = !!process.env.RSS
const distDir = './dist'
const gzipedDir = ['./dist/assets/js', './dist/assets/css']
const delRSSDir = `del "${path.join(__dirname, './dist/rss.xml')}"`
const websiteOBSTarget = `obs://mgear-blogs`
const Bucket = 'mgear-blogs'
const get = url => Bucket + '/' + url

const uploadWebsite = `obsutil sync ${distDir} ${websiteOBSTarget}`

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time))
}

const task = {
  deleteRSS: () => {
    return new Promise(resolve => {
      console.log('| delete rss-file start : ', uploadWebsite)
      cmd.get(delRSSDir, async error => {
        error ? console.error('| delete rss-file error : ', error) : console.log('| delete rss-file success')
        resolve()
      })
    })
  },
  renameGzipFile: () => {
    console.log('| rename gzip-file start ...')
    gzipedDir.map(dir => {
      fs.readdirSync(dir).map(item => {
        const isGZ = item.endsWith('.gz')
        if (isGZ) {
          const rawFileName = path.join(dir, item.replace(/\.gz$/, ''))
          fs.existsSync(rawFileName) && fs.unlinkSync(rawFileName)
          fs.renameSync(path.join(dir, item), rawFileName)
        }
      })
    })
    console.log('| rename gzip-file success ...')
  },
  uploadMgear: () => {
    return new Promise(resolve => {
      console.log('| upload website start : ', uploadWebsite)
      function upload() {
        cmd.get(uploadWebsite, async error => {
          error ? console.error('| upload website error : ', error) : console.log('| upload website success')
          if (error) {
            console.log('| ERROR & RETRY...')
            upload()
          } else {
            resolve()
          }
        })
      }
      upload()
    })
  },
  run: async () => {
    if (!enableRSS) {
      await sleep()
      await task.deleteRSS()
    }

    // await sleep()
    // await task.renameGzipFile()

    await sleep()
    await task.uploadMgear()

    // await sleep()
    // task.changeGzipFileHeader()
  },
  changeGzipFileHeader: () => {
    // console.log('| change gzip-file header start ...')
    // gzipedDir.map(dir => {
    //     fs.readdirSync(dir).map(item => {
    //         console.log(path.join(dir.replace('dist/', ''), item))
    //     })
    // })
    // console.log('| change gzip-file header success ...')
    // obs.copyObject({
    //     Bucket,
    //     Key: 'assets/css/0.styles.0b1f98ca.css-back',
    //     CopySource: 'mgear-blogs/assets/css/0.styles.0b1f98ca.css',
    //     MetadataDirective: 'REPLACE',
    //     Headers: {
    //         'Content-Type': 'text/html',
    //         'Content-Encoding': 'gzip'
    //     },
    //     Metadata: {
    //         'Content-Type': 'text/html',
    //         'Content-Encoding': 'gzip'
    //     }
    // }).then(response => {
    //     console.log(response)
    // })
  }
}

task.run()
