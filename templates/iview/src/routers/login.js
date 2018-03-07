const routers = [{
  name: 'login',
  path: '/login',
  meta: { title: '登录', unauth: true },
  component: resolve => require(['views/login'], resolve),
}]

export default routers
