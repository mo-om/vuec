<template>
  <div class="app">
    <app-header></app-header>
    <app-view>
      <app-sidebar>
        <app-menu class="app-menu" mode="vertical" theme="light" :menus="menus"></app-menu>
      </app-sidebar>
      <app-content>
        <router-view v-if="$route.name!=='@route-name'"></router-view>
        <div v-else>todo...</div>
      </app-content>
    </app-view>
  </div>
</template>
<script>
  import { menus } from 'statics/menus';
  export default {
    data() {
      return {
        menus,
      }
    },
    methods: {

    }
  }
</script>
