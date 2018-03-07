const fse = require('fs-extra');
const path = require('path');
const { getBaseFile } = require('./operation');

module.exports = function (dir, fileName, type) {
  const extension = ['view','module','component'].indexOf(type) !== -1
    ? '.vue'
    : '.js'
  const baseFile = getBaseFile(type)
  const from = path.join(__dirname, `../templates/files/${baseFile}`)
  const to = path.resolve(dir, `${fileName}${extension}`)
  fse.copySync(from, to)
  console.log(dir)
  console.log(to)

}
