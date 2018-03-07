const routers = [{
  name: 'demo',
  path: '/demo',
  meta: { title: 'demo' },
  component: resolve => require(['views/demo'], resolve),
  children: [{
    name: 'demo.chart',
    path: 'chart',
    meta: { title: 'chart' },
    component: resolve => require(['views/demo/chart'], resolve),
  },{
    name: 'demo.table',
    path: 'table',
    meta: { title: 'table' },
    component: resolve => require(['views/demo/table'], resolve),
  },{
    name: 'demo.search',
    path: 'search',
    meta: { title: 'search' },
    component: resolve => require(['views/demo/search'], resolve),
  }]
}]

export default routers
