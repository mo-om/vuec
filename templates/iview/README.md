
## 开发构建
```
install yarn and then

yarn
yarn run dev
NODE_ENV=$BRANCH yarn run build

finaly all scripts in package.json file
```

## 主题定制
iview (styles/theme.less)

```
@import '~iview/src/styles/index.less';
// Here are the variables to cover, such as:
@primary-color: #3273dc;
@active-color: #2366d1;
// ...rest
```

app (styles/variables.less)

```
@app-header-height: 48px;
@app-sidebar-width: 240px;
@app-section-background: #fff;
@app-light-active-color: #ecf6fd;
@app-box-shadow-vertical: 0 0 1.2em rgba(0,0,0,.12);
@app-box-shadow-horizontal: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
```

## 路由设计
```js
import login from './login';
import home from './home';
import demo from './demo';
// import yourRouterModule from './your-router-module';
import unmatche from './unmatche';

const routers = [
  ...login,
  ...home,
  // rest yourRouterModule
  ...unmatche,
]

export default routers;
```

## 视图设计
```vue
<template>
  <div class="app">
    <app-header></app-header>
    <app-view>
      <app-sidebar></app-sidebar>
      <app-content>
        <router-view></router-view>
      </app-content>
    </app-view>
  </div>
</template>

<template>
  <div class="app">
    <app-header></app-header>
    <router-view>
      <!-- will insert AppView, AppSidebar, AppContent by router -->
    </router-view>
  </div>
</template>

<template>
  <div class="app">
    <app-header></app-header>
    <router-view v-if="$route.name!=='loan'"></router-view>
    <app-view v-else>
      <app-sidebar></app-sidebar>
      <app-content>
        loan component logic
      </app-content>
    </app-view>
  </div>
</template>

<script>
  import { AppHeader, AppView, AppSidebar, AppContent } from 'components';
  export default {
    components: {
      AppHeader,
      AppView,
      AppSidebar,
      AppContent,
    },
    methods: {

    }
  }
</script>
```

# 模块路径别名
webpack.base.config.js ,在深层次目录中引用文件可以使用别名

```js
module.exports = {
  // ...rest,
  resolve: {
    // ...rest,
    alias: {
      'vue': 'vue/dist/vue.esm.js',
      'api': path.resolve(__dirname, 'src/api'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'views': path.resolve(__dirname, 'src/views'),
      'images': path.resolve(__dirname, 'src/images'),
      'styles': path.resolve(__dirname, 'src/styles'),
      'routers': path.resolve(__dirname, 'src/routers'),
      'statics': path.resolve(__dirname, 'src/statics'),
      'constants': path.resolve(__dirname, 'src/constants'),
      'components': path.resolve(__dirname, 'src/components'),
    }
  }
}
```
