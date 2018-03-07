<template>
  <div class="app-view" :class="{'sidebar-opened': sidebarOpenState}">
    <slot></slot>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {

      }
    },
    computed: {
      sidebarOpenState () {
        return this.sidebarOpened()
      }
    },
    methods: {
      ...mapGetters([
        'sidebarOpened'
      ]),
    }
  }
</script>
