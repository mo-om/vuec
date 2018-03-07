#!/usr/bin/env node

var fs = require('fs')
var fse = require('fs-extra')
var path = require('path')
var util = require('util')
var mkdirp = require('mkdirp')
var readline = require('readline')

var MODE_0666 = parseInt('0666', 8)
var MODE_0755 = parseInt('0755', 8)

var _exit = process.exit
/**
 * Install an around function; AOP.
 */

function around (obj, method, fn) {
  var old = obj[method]

  obj[method] = function () {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) args[i] = arguments[i]
    return fn.call(this, old, args)
  }
}

/**
 * Install a before function; AOP.
 */

function before (obj, method, fn) {
  var old = obj[method]

  obj[method] = function () {
    fn.call(this)
    old.apply(this, arguments)
  }
}

/**
 * Prompt for confirmation on STDOUT/STDIN
 */

function confirm (msg, callback) {
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.question(msg, function (input) {
    rl.close()
    callback(input);
  })
}

function switchFn (msg, callback) {
  var rl1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl1.question(msg, function (input) {
    rl1.close()
    callback(input)
  })
}

/**
 * Copy file from template directory.
 */


/**
 * Determine if launched from cmd.exe
 */

function launchedFromCmd () {
  return process.platform === 'win32' &&
    process.env._ === undefined
}

/**
 * Mkdir -p.
 *
 * @param {String} path
 * @param {Function} fn
 */

function mkdir (path, fn) {
  mkdirp(path, MODE_0755, function (err) {
    if (err) throw err
    console.log('   \x1b[36mcreate\x1b[0m : ' + path)
    fn && fn()
  })
}

/**
 * Generate a callback function for commander to warn about renamed option.
 *
 * @param {String} originalName
 * @param {String} newName
 */

function renamedOption (originalName, newName) {
  return function (val) {
    warning(util.format('option `%s\' has been renamed to `%s\'', originalName, newName))
    return val
  }
}

function warning (message) {
  console.error()
  message.split('\n').forEach(function (line) {
    console.error('  warning: %s', line)
  })
  console.error()
}

/**
 * echo str > path.
 *
 * @param {String} path
 * @param {String} str
 */

function write (path, str, mode) {
  fse.ensureFileSync(path);
  fs.writeFileSync(path, str, { mode: mode || MODE_0666 })
  console.log('   \x1b[36mcreate\x1b[0m : ' + path)
}

function travel(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    var pathname = path.join(dir, file);
    if (fs.statSync(pathname).isDirectory()) {
      travel(pathname, callback);
    } else {
      callback(pathname);
    }
  });
}

/**
 * Check if the given directory `path` is empty.
 *
 * @param {String} path
 * @param {Function} fn
 */

function emptyDirectory (path, fn) {
  fs.readdir(path, function (err, files) {
    if (err && err.code !== 'ENOENT') throw err
    fn(!files || !files.length)
  })
}

function existDir (path){
  fs.stat(path, function(err, stat) {
    return err == null && stat.isDirectory()
  });
}

function existFile(file){
  fs.stat(file, function(err, stat) {
    if(err == null) {
      if(stat.isFile()) {
        return true;
      }
    } else {
      return false;
    }
  });
}

function isExist(file, callback){
  fs.access(file, function(err){
    callback(err == null);
  })
}

/**
 * Create an app name from a directory path, fitting npm naming requirements.
 *
 * @param {String} pathName
 */

function createAppName (pathName) {
  return validName(path.basename(pathName))
}

function validName (name) {
  return name
    .replace(/[^A-Za-z0-9.()!~*'-]+/g, '-')
    .replace(/^[-_.]+|-+$/g, '')
    .toLowerCase()
}

/**
 * Graceful exit for async STDIO
 */

function exit (code) {
  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done () {
    if (!(draining--)) _exit(code)
  }

  var draining = 0
  var streams = [process.stdout, process.stderr]

  exit.exited = true

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1
    stream.write('', done)
  })

  done()
}

function pascalCased(str){
  return str
    .replace(/-/g,' ')
    .replace(/_/g,' ')
    .replace(/\b(\w)(\w*)/g, ($0, $1, $2) => `${$1.toUpperCase()}${$2.toLowerCase()}`)
    .replace(/\s/g,'')
}

function getBaseFile (type) {
  return {
    'view': 'baseView.vue',
    'store': 'baseStore.js',
    'filter': 'baseFilter.js',
    'module': 'baseComponent.vue',
    'directive': 'baseDirective.js',
    'component': 'baseComponent.vue',
  }[type]
}

module.exports = {
  around,
  before,
  confirm,
  switchFn,
  renamedOption,
  launchedFromCmd,
  mkdir,
  write,
  travel,
  existDir,
  emptyDirectory,
  createAppName,
  existFile,
  exit,
  isExist,
  validName,
  pascalCased,
  getBaseFile,
}
