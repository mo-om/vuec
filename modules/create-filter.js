const fse = require('fs-extra');
const path = require('path');
const replaceModule = require('./replace-module');
const createBaseFile = require('./create-base-file');
const { confirm, pascalCased, createAppName } = require('./operation');

module.exports = function (type, name, options) {
  const fileName = createAppName(name)
  const dir = path.resolve(name, '..')
  const filterFile = path.resolve(dir, `${fileName}.js`)
  const filterEntryFile = path.resolve(name, '..', 'index.js')
  const registerLine = pascalCased(fileName)
  const importLine = `import ${registerLine} from './${fileName}'`
  const fileData = fse.readFileSync(filterEntryFile, 'utf8')
  const newFileData = replaceModule(fileData, importLine, registerLine)

  function registerFilter () {
    fse.outputFileSync(filterEntryFile, newFileData)
  }

  function createFilterAndOutputMsg () {
    if (fse.existsSync(filterFile)) {
      console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
    } else {
      createBaseFile(dir, fileName, type);
      registerFilter()
      console.log('%s %s was created', type, fileName)
    }
  }

  createFilterAndOutputMsg()
}
