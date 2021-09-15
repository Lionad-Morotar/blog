const fs = require('fs')
const path = require('path')
const { accessKeyId, secretAccessKey } = require('../secrets/aliyun-mgear')

const confContent = `{
  "AccessKeyId": "${accessKeyId}",
  "AccessKeySecret": "${secretAccessKey}",
  "oss": {
    "securityToken": "",
    "endpoint": "http://oss-cn-shanghai.aliyuncs.com",
    "region": "oss-cn-shanghai",
    "internal": true,
    "secure": false,
    "cname": "",
    "timeout": 60,
    "autoRefreshCDN": false,
    "contentEncoding": "",
    "bucket": "mgear-file"
  },  
  "watch": {
    "ignored": ""
  },
  "keepWatching": true,
  "syncDir": "C:/Users/18062/OneDrive/WebSaver",
  "syncFilter": [
    ".",
    "!secrets"
  ]
}`

fs.writeFileSync(path.join(__dirname, '../.osssync.json'), confContent)