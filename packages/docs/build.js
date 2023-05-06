const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')

// 检测有没有文件夹 没有的话创建一个
const distDir = path.resolve(__dirname, 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir)
}

const admzip = new AdmZip()
admzip.addLocalFolder('docs')
admzip.writeZip('dist/web-engine-docs.zip')
