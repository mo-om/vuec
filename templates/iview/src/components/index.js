import AppHeader from './app-header';
import AppMenu from './app-menu';
import AppView from './app-view';
import AppBreadcrumb from './app-breadcrumb';
import ConfirmButton from './confirm-button';

const components = {
  AppHeader,
  AppMenu,
  AppView,
  AppSidebar: AppView.AppSidebar,
  AppContent: AppView.AppContent,
  AppBreadcrumb,
  ConfirmButton,
}

const install = function(Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(component => Vue.component(component, components[component]))
}

const API = {
  install,
  ...components
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

module.exports.default = module.exports = API
