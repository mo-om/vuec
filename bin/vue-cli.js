#!/usr/bin/env node

var fs = require('fs')
var path = require('path')
var program = require('commander')
var pkg = require('../package.json')
var version = pkg.version

const createProject = require('../modules/create-project')
const {
  around,
  before,
  mkdir,
  write,
  launchedFromCmd,
  emptyDirectory,
  confirm,
  createAppName,
  exit,
} = require('../modules/operation')

var _exit = process.exit

// Re-assign process.exit because of commander
// TODO: Switch to a different command framework
process.exit = exit

// CLI

around(program, 'optionMissingArgument', function (fn, args) {
  program.outputHelp()
  fn.apply(this, args)
  return { args: [], unknown: [] }
})

before(program, 'outputHelp', function () {
  // track if help was shown for unknown option
  this._helpShown = true
})

before(program, 'unknownOption', function () {
  // allow unknown options if help was shown, to prevent trailing error
  this._allowUnknownOption = this._helpShown

  // show help if not yet shown
  if (!this._helpShown) {
    program.outputHelp()
  }
})

program
  .version(version, '-v, --version')
  .usage('[options] [dir]');

/**
 * here what we do, type commander ...
 */

program
  .command('g <type> [name]')
  .option('-s, --subview <names>', 'create sub views')
  .option('-m, --multiview <names>', 'create multi views')
  .description('create a vue type module')
  .action(function (type, name, options) {
    var args = arguments;
    try {
      require(`../modules/create-${type}`)(...args);
    } catch (e) {
      console.log('vue: command not found: %s', type)
    }
    exit.exited = true;
  });

program
  .parse(process.argv);

if (!exit.exited) {
  main()
}

/**
 * Create application at the given directory `path`.
 *
 * @param {String} path
 */

function createApplication(name, path) {
  var wait = 5

  console.log()
  function complete() {
    if (--wait) return
    var prompt = launchedFromCmd() ? '>' : '$'

    console.log()
    console.log('   install dependencies:')
    console.log('     %s cd %s && npm install', prompt, path)
    console.log()
    console.log('   run the app:')

    if (launchedFromCmd()) {
      console.log('     %s SET DEBUG=%s:* & npm start', prompt, name)
    } else {
      console.log('     %s DEBUG=%s:* npm start', prompt, name)
    }

    console.log()
  }

  mkdir(path, function () {
    process.stdin.destroy()
    createProject('iview', path);
    // confirm('Type down "iview" or "bootstrap" to set up themes ', function select (type) {
    //   if(['iview', 'bootstrap'].indexOf(type) !== -1){
    //   }else{
    //     confirm('Type down "iview" or "bootstrap" to set up themes ', select)
    //   }
    // });
    complete()
  })
}

/**
 * Main program.
 */

function main() {
  var destinationPath = program.args.shift() || '.'

  // App name
  var appName = createAppName(path.resolve(destinationPath)) || 'hello-world'

  // Generate application
  emptyDirectory(destinationPath, function (empty) {
    if (empty || program.force) {
      createApplication(appName, destinationPath)
    } else {
      confirm('destination is not empty, continue? [y/N] ', function (ok) {
        if (/^y|yes|ok|true$/i.test(ok)) {
          // process.stdin.destroy()
          createApplication(appName, destinationPath)
        } else {
          console.error('aborting')
          exit(1)
        }
      })
    }
  })
}
