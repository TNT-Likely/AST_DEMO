const path = require('path')
const { transform } = require('./lib/index')

const wepyPath = path.resolve(__dirname, './test.wepy')
const vuePath = path.resolve(__dirname, './test.vue')

transform(wepyPath, vuePath)