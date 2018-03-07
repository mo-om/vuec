const fse = require('fs-extra');
const path = require('path');

const getPackageJson = ({projectName}) => {
  return {
    'name': projectName,
    'version': '1.0.0',
    'license': 'MIT',
    'description': projectName,
    'main': 'index.js',
    'private': true,
    'scripts': {
      'dev': 'webpack-dev-server --config webpack.dev.config.js',
      'start': 'webpack-dev-server --config webpack.dev.config.js',
      'build': 'webpack --progress --hide-modules --config webpack.prod.config.js',
      'lint': 'eslint --fix --ext .js,.vue src',
      'test': 'npm run lint'
    },
    'dependencies': {
      'axios': '^0.17.0',
      'iview': '^2.7.2',
      'lodash': '^4.17.4',
      'vue': '^2.2.6',
      'vue-echarts': '^2.5.1',
      'vue-router': '^2.2.1',
      'vuex': '^3.0.1'
    },
    'devDependencies': {
      'autoprefixer-loader': '^2.0.0',
      'babel-core': '^6.23.1',
      'babel-eslint': '^8.2.2',
      'babel-loader': '^6.2.4',
      'babel-plugin-external-helpers': '^6.22.0',
      'babel-plugin-transform-object-rest-spread': '^6.26.0',
      'babel-plugin-transform-runtime': '^6.23.0',
      'babel-preset-env': '^1.6.1',
      'babel-runtime': '^6.26.0',
      'css-loader': '^0.23.1',
      'eslint': '^4.10.0',
      'eslint-plugin-vue': '^2.1.0',
      'extract-text-webpack-plugin': '^2.0.0',
      'file-loader': '^0.8.5',
      'html-loader': '^0.3.0',
      'html-webpack-plugin': '^2.28.0',
      'iview-loader': '^1.0.0-beta.3',
      'less': '^2.7.1',
      'less-loader': '^2.2.3',
      'style-loader': '^0.13.1',
      'url-loader': '^0.5.7',
      'vue-hot-reload-api': '^1.3.3',
      'vue-html-loader': '^1.2.3',
      'vue-loader': '^11.0.0',
      'vue-style-loader': '^1.0.0',
      'vue-template-compiler': '^2.2.1',
      'webpack': '^2.2.1',
      'webpack-bundle-analyzer': '^2.9.0',
      'webpack-dev-server': '~2.9.7',
      'webpack-merge': '^3.0.0'
    }
  }
}

module.exports = function (target, options) {
  var file = path.join(target, 'package.json');
  fse.outputJsonSync(file, getPackageJson(options),{spaces:2})
}
