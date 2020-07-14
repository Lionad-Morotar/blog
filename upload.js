#!/usr/bin/env node

const cmd = require('node-cmd')
const path = require('path')

const enableRSS = false
const distDir = './dist'
const delRSSDir = `del "${path.join(__dirname, './dist/rss.xml')}"`
const websiteOBSTarget = `obs://mgear-blogs`

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
    run: async () => {
        await sleep()

        if (!enableRSS) {
            await task.deleteRSS()
        }

        console.log('| upload website start : ', uploadWebsite)
        cmd.get(uploadWebsite, async error => {
            error ? console.error('| upload website error : ', error) : console.log('| upload website success')
            if (error) {
                console.log('| ERROR & RETRY...')
                task.run()
            }
        })
    }
}

task.run()
