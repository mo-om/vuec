const fse = require('fs-extra');
const path = require('path');
const replaceModule = require('./replace-module');
const createBaseFiles = require('./create-base-files');
const { confirm, pascalCased, createAppName } = require('./operation');

module.exports = function (type, name, options) {
  const fileName = createAppName(name)
  const dir = path.resolve(name, '..', fileName)
  const componentEntryFile = path.resolve(name, '..', 'index.js')
  const registerLine = pascalCased(fileName)
  const importLine = `import ${registerLine} from './${fileName}'`
  const fileData = fse.readFileSync(componentEntryFile, 'utf8')
  const newFileData = replaceModule(fileData, importLine, registerLine)

  function registerComponent () {
    fse.outputFileSync(componentEntryFile, newFileData)
  }

  function createComponentAndOutputMsg () {
    if (fse.existsSync(dir)) {
      console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
    } else {
      createBaseFiles(dir, fileName, type);
      registerComponent()
      console.log('%s %s was created', type, fileName)
    }
  }

  createComponentAndOutputMsg()
}
