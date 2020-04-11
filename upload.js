#!/usr/bin/env node

const cmd = require('node-cmd')

const distDir = './dist'
const publicDirName = 'mgear'
const publicOBSTarget = `obs://blog-image/mgear`
const websiteOBSTarget = `obs://mgear-blogs`

const uploadImages = `obsutil sync ${distDir}/${publicDirName}/image ${publicOBSTarget}/image`
const uploadFonts = `obsutil sync ${distDir}/${publicDirName}/fonts ${publicOBSTarget}/fonts`
const delDistPublic = `rd /q /s "${distDir}/${publicDirName}"`
const uploadWebsite = `obsutil sync ${distDir} ${websiteOBSTarget}`

function sleep(time = 1000) {
  return new Promise(resolve => setTimeout(resolve, time))
}

// 同步图片文件
console.log('| upload images start : ', uploadImages)
cmd.get(uploadImages, async error => {
  error
    ? console.error('| upload images error : ', error)
    : console.log('| upload images success')

  // // 同步字体文件
  // await sleep()
  // console.log('| upload fonts start : ', uploadFonts)
  // cmd.get(uploadFonts, async error => {
  //   error
  //     ? console.error('| upload fonts error : ', error)
  //     : console.log('| upload fonts success')

  // 删除公共目录
  await sleep()
  console.log('| delete public start : ', delDistPublic)
  cmd.get(delDistPublic, async error => {
    error
      ? console.error('| delete public error : ', error)
      : console.log('| delete public success')

    // 同步网站资源
    await sleep()
    console.log('| upload website start : ', uploadWebsite)
    cmd.get(uploadWebsite, async error => {
      error
        ? console.error('| upload website error : ', error)
        : console.log('| upload website success')
    })
  })
  // })
})
