const fse = require('fs-extra');
const path = require('path');
const replaceModule = require('./replace-module');
const { camelCase } = require('lodash');
const { confirm, pascalCased, createAppName } = require('./operation');

module.exports = function (type, name, options) {
  const fileName = createAppName(name)
  const dir = path.resolve(name, '..')
  const routerFile = path.resolve(dir, `${fileName}.js`)
  const routerIndexFile = path.resolve(name, '..', 'index.js')
  const camelCaseName = camelCase(fileName)
  const registerLine = `...${camelCaseName}`
  const importLine = `import ${camelCaseName} from './${fileName}'`
  const fileData = fse.readFileSync(routerIndexFile, 'utf8')
  const newFileData = replaceModule(fileData, importLine, registerLine)

  function getRouterFileData () {
    return `
const routers = [{
  name: '${fileName}',
  path: '/${fileName}',
  meta: { title: '${fileName}' },
  component: resolve => require(['views/${fileName}'], resolve),
  children: [],
}]

export default routers
    `
  }

  function createRouterFile () {
    fse.outputFileSync(routerFile, getRouterFileData())
  }

  function registerRouter () {
    fse.outputFileSync(routerIndexFile, newFileData)
  }

  function createRouterAndOutputMsg () {
    if (fse.existsSync(routerFile)) {
      console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
    } else {
      createRouterFile()
      registerRouter()
      console.log(dir)
      console.log(routerFile)
      console.log('%s %s was created', type, fileName)
    }
  }

  createRouterAndOutputMsg()
}
