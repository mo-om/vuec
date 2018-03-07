const fse = require('fs-extra');
const path = require('path');
const { createAppName } = require('./operation')

module.exports = function (type, target) {
  var project = path.join(__dirname, '..', 'templates', type);
  var projectName = createAppName(target);
  fse.copy(project, target, err => {
    if (err) return console.error(err)
    require('../modules/create-project-config')(target, {projectName})
    require('../modules/create-package-json')(target, {projectName})
    console.log('%s was created', projectName)
    console.log('you can run script next:')
    console.log('cd %s && yarn', target)
  })
}
