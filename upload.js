#!/usr/bin/env node

const cmd = require('node-cmd')

const distDir = './dist'
const websiteOBSTarget = `obs://mgear-blogs`

const uploadWebsite = `obsutil sync ${distDir} ${websiteOBSTarget}`

function sleep(time = 1000) {
    return new Promise(resolve => setTimeout(resolve, time))
}

const task = {
    run: async () => {
        await sleep()
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
