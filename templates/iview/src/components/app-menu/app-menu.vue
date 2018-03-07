<template>
  <Menu class="app-menu" :open-names="opened" :mode="mode" :theme="theme" :active-name="$route.name" @on-select="select">
    <Submenu v-if="item.children && item.children.length" :name="item.name" v-for="(item,index) in menus" :key="index">
      <template slot="title">
        <!-- <Icon v-if="item.icon" :type="item.icon"></Icon> -->
        <Icon type="ios-albums-outline"></Icon>
        {{item.label}}
      </template>
      <MenuItem v-for="(child,index) in item.children" :key="child.name" :name="child.name">
        <Icon type="ios-circle-outline"></Icon>
        {{child.label}}
      </MenuItem>
    </Submenu>
    <MenuItem v-if="!item.children" :name="item.name" v-for="(item,index) in menus" :key="item.name">
      <!-- <Icon v-if="item.icon" :type="item.icon"></Icon> -->
      <Icon type="ios-albums-outline"></Icon>
      {{item.label}}
    </MenuItem>
  </Menu>
</template>

<script>
  import { menus } from 'statics/menus';
  import { Menu } from 'iview';
  export default {
    // extends: Menu,
    data () {
      return {
        opened: []
      }
    },
    created () {
      this.initOpened()
    },
    props: {
      mode: String,
      theme: String,
      menus: Array,
    },
    methods: {
      select (name) {
        this.$router.push({name:name})
      },
      initOpened () {
        this.opened = [this.$route.name.split('.')[0]]
      }
    }
  }
</script>
