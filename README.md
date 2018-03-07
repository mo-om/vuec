## a scaffold which building vue app

<br/>

### 本地安装

>npm install

>cd bin

>npm link

<br/>

### 检查

>fx-vue -v or fx-vue -h

<br/>

### 使用

>fx-vue myapp && cd myapp/src


| 类型       | 示例                                       |   是否注册模块  |
| :-------- | :------------------------------------------| :-----------: |
| module    | fx-vue g module views/or/components/name   |       否      |
| view      | fx-vue g view views/my-view                |       是      |
| store     | fx-vue g store store/my-store              |       是      |
| router    | fx-vue g router routers/my-router          |       是      |
| filter    | fx-vue g filter filters/my-filter          |       是      |
| component | fx-vue g component components/my-component |       是      |
| directive | fx-vue g directive directives/my-directive |       是      |

<br/>

### 说明

创建多视图, 在创建multiview时不能同时创建subview
>fx-vue g view views -m view1,view2,view3

创建子视图, 在创建view时还可以同时创建subview并生成一个对应的router, 但不会为subview生成对应的router
>fx-vue g view views/my-view -s subview1,subview2,subview3

关于是否注册模块
>注册模块表示在对应模块的入口/出口文件index.js中import生成的模块并注册

关于创建路由
>如果你在创建路由前还没有创建对应的view,那么你的程序会发生错误，因为路由里匹配的视图文件并不存在

<br/>
