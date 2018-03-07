import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from 'routers';
import store from './store';
import App from 'views/app';
import components from 'components';
import directives from 'directives';
import filters from 'filters';
import { auth, setTitle, axiosConfig } from 'utils';
import 'styles/index.less';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(components);
Vue.use(directives);
Vue.use(filters);

axiosConfig();

// 路由配置
const router = new VueRouter({
  mode: 'history',
  routes: Routers,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

router.beforeEach((to, from, next) => {
  // auth(to, from, next);
  iView.LoadingBar.start();
  setTitle(to.meta.title);
  next();
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
