const fse = require('fs-extra');
const path = require('path');
const createRouter = require('./create-router');
const replaceModule = require('./replace-module');
const createBaseFile = require('./create-base-file');
const createBaseFiles = require('./create-base-files');
const { confirm, pascalCased, createAppName, validName } = require('./operation');

function isRepeat (arr) {
  let view = {};
  for (let i in arr) {
    if (view[arr[i]]) return true;
    view[arr[i]] = true;
  }
  return false;
}

module.exports = function (type, name, options) {
  const fileName = createAppName(name)
  const dir = path.resolve(name, '..', fileName)
  const from = path.join(__dirname, '../templates/files/baseView.vue')
  const to = path.resolve(dir, 'index.vue')
  const viewArgv = options.multiview;
  const subviewArgv = options.subview;
  // todo: need a better resolve
  const routerName = path.resolve(name).replace('/views/','/routers/')
  const fileData = fse.readFileSync(from, 'utf8')

  if (viewArgv && subviewArgv) {
    console.log('invalid option: view and subview can\'t not be create at the same time, please check your input');
    return
  }

  if (subviewArgv) {
    if (isRepeat(subviewArgv.trim().split(','))) {
      console.log('invalid option: subview %s is repeated, please check your input', subviewArgv);
      return
    }
  }

  if (viewArgv) {
    if (isRepeat(viewArgv.trim().split(','))) {
      console.log('invalid option: view %s is repeated, please check your input', viewArgv);
      return
    }
  }

  function createView () {
    const newFileData = fileData.replace('@route-name', fileName)
    fse.outputFileSync(to, newFileData)
    console.log(dir)
    console.log(to)
    console.log('%s %s was created', type, fileName)
    createRouter('router', routerName, options);
  }

  function createMultiView () {
    viewArgv.trim().split(',').forEach((item) => {
      let fileName = validName(item);
      let newFileData = fileData.replace('@route-name', fileName)
      let dir = path.resolve(name, fileName)
      let to = path.resolve(dir, 'index.vue')
      let routerName = path.resolve(name, fileName).replace('/views/','/routers/')
      if (!fse.existsSync(dir)) {
        fse.outputFileSync(to, newFileData);
        console.log(dir)
        console.log(to)
        console.log('%s %s was created', type, fileName)
        createRouter('router', routerName, options);
      } else {
        console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
      }
    })
  }

  function createSubview () {
    subviewArgv.trim().split(',').forEach((item) => {
      let subFileName = validName(item)
      let subdir = path.resolve(dir, item)
      if (!fse.existsSync(subdir)) createBaseFiles(subdir, subFileName, 'component');
    })
  }

  function createViewAndOutputMsg () {
    if (fse.existsSync(dir)) {
      console.log('%s %s is exists, it\'s danger to overwrite, skipped', type, fileName)
    } else {
      createView();
    }
    if (subviewArgv) createSubview ();
  }

  function createMultiViewAndOutputMsg () {
    createMultiView()
  }

  if (viewArgv) {
    createMultiViewAndOutputMsg()
  } else {
    createViewAndOutputMsg()
  }

  // tood: 优化
}
