import Demo from './demo';

const directives = {
  Demo,
}

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(directives).forEach(directive => Vue.directive(directive, directives[directive]))
}

const API = {
  install,
  ...directives
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports.default = module.exports = API
