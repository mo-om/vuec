<template>
  <div class="app-header">
    <router-link class="app-brand" :to="{ name: 'home' }">
      <img class="app-logo" src="../../images/logo.png">
      <span class="app-name">{{appName}}</span>
    </router-link>
    <a class="app-expand-ctrl" @click="toogleSidebar" href="javascript:;">
      <Icon class="ctrl-handle midle" type="navicon"></Icon>
    </a>
    <div class="app-header-info">
      <slot>
        <app-breadcrumb></app-breadcrumb>
      </slot>
    </div>
    <Menu class="app-menu-right" mode="horizontal" :theme="'primary'">
      <Submenu name="user-menu">
        <template slot="title">
          <Icon type="person"></Icon>
          {{username}}
        </template>
        <MenuItem name="password"><div @click="password=true">修改密码</div></MenuItem>
        <MenuItem name="logout"><div @click="logout($router)">退出</div></MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { appName, authMobile } from 'configs';
  import { logout, storageHelper } from 'utils';
  import { menus } from 'statics/menus';
  import AppMenu from '../app-menu'; // can not import as menber from 'components';
  import AppBreadcrumb from '../app-breadcrumb';
  export default {
    data () {
      return {
        menus: menus,
        appName: appName,
        username: storageHelper.getItem(authMobile),
        password:false
      }
    },
    mounted () {

    },
    components: {
      AppMenu,
      AppBreadcrumb,
    },
    methods: {
      modalhide: function() {
        this.password = false;
      },
      logout: logout,
      ...mapGetters([
        'sidebarOpened'
      ]),
      ...mapActions([
        'toogleSidebar'
      ])
    }
  }
</script>
