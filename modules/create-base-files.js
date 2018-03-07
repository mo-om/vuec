const fse = require('fs-extra');
const path = require('path');
const createBaseFile = require('./create-base-file');
const { pascalCased } = require('./operation');

function getFileData (fileName) {
  const moduleName = pascalCased(fileName)
  return `
import ${moduleName} from './${fileName}';
export default ${moduleName};
  `
}

module.exports = function (dir, fileName, type) {
  const entryFile = path.resolve(dir, 'index.js')
  createBaseFile(dir, fileName, type)
  fse.outputFileSync(entryFile, getFileData(fileName))
  console.log(entryFile)

}
