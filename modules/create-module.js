const fse = require('fs-extra');
const path = require('path');
const createBaseFiles = require('./create-base-files');
const { confirm, createAppName } = require('./operation');

module.exports = function (type, name, options) {
  const fileName = createAppName(name)
  const dir = path.resolve(name, '..', fileName)

  function createModuleAndOutputMsg() {
    if (fse.existsSync(dir)) {
      console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
    } else {
      createBaseFiles(dir, fileName, type);
      console.log('%s %s was created', type, fileName)
    }
  }

  createModuleAndOutputMsg()
}
