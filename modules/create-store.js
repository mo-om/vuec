const fse = require('fs-extra');
const path = require('path');
const replaceModule = require('./replace-module');
const createBaseFile = require('./create-base-file');
const { camelCase } = require('lodash');
const { confirm, pascalCased, createAppName } = require('./operation');

module.exports = function (type, name, options) {
  const fileName = createAppName(name)
  const dir = path.resolve(name, '..')
  const storeFile = path.resolve(dir, `${fileName}.js`)
  const storeEntryFile = path.resolve(name, '..', 'index.js')
  const registerLine = camelCase(fileName)
  const importLine = `import ${registerLine} from './${fileName}'`
  const fileData = fse.readFileSync(storeEntryFile, 'utf8')
  const newFileData = replaceModule(fileData, importLine, registerLine)

  function registerStore () {
    fse.outputFileSync(storeEntryFile, newFileData)
  }

  function createStoreAndOutputMsg () {
    if (fse.existsSync(storeFile)) {
      console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
    } else {
      createBaseFile(dir, fileName, type);
      registerStore()
      console.log('%s %s was created', type, fileName)
    }
  }

  createStoreAndOutputMsg()
}
