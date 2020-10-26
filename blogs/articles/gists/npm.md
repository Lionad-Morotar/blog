# NPM

## CNPM

`cnpm install` 时不会更新 package-lock.json，有可能导致一些稀奇古怪的问题。如果想更新 package-lock.json 的话，需要删除 node_modules、package-lock.json，再重新 `npm install`。