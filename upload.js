#!/usr/bin/env node

const cmd = require('node-cmd')

// 项目打包后资源文件夹
const distDir = './dist'
// 打包后图片文件目录名
const publicDirName = 'mgear'
// 图片上传路径
const publicOBSTarget = `obs://blog-image`
// 网站上传路径
const websiteOBSTarget = `obs://mgear-blogs`

const uploadPublic = `obsutil sync ${distDir}/${publicDirName} ${publicOBSTarget}`
const delDistPublic = `rd /q /s "${distDir}/${publicDirName}"`
const uploadWebsite = `obsutil sync ${distDir} ${websiteOBSTarget}`

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time))
}

console.log('| upload images start')
cmd.get(uploadPublic, async error => {
  error
    ? console.error('| upload images error : ', error)
    : console.log('| upload images success')

  await sleep()
  console.log('| delete public start')
  cmd.get(delDistPublic, async error => {
    error
      ? console.error('| delete public error : ', error)
      : console.log('| delete public success')

    await sleep()
    console.log('| upload website start')
    cmd.get(uploadWebsite, async error => {
      error
        ? console.error('| upload website error : ', error)
        : console.log('| upload website success')
    })
  })
})
