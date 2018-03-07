const fse = require('fs-extra');
const path = require('path');

const getFileData = ({projectName}) => {
  return `
const configs = {
  base: '${projectName}',
  appName: '${projectName}',
  authToken: 'x-user-token',
  authMobile: 'x-user-mobile',
  storagePrefix: 'your-storage-prefix',
}
module.exports.default = module.exports = configs
  `
}

module.exports = function (target, options) {
  var file = path.join(target, 'src/configs/index.js');
  fse.outputFileSync(file, getFileData(options))
}
