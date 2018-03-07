const routers = [{
  name: 'home',
  path: '/home',
  meta: { title: '首页' },
  component: resolve => require(['views/home'], resolve),
}]

export default routers
