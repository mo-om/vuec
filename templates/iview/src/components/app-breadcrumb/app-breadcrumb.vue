<template>
  <Breadcrumb class="app-breadcrumb" :separator="iconSeparator">
    <BreadcrumbItem v-for="item in data" :key="item.path" :to="item.path">{{item.meta.title}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
  export default {
    props: {

    },
    data () {
      return {
        data: [],
        iconSeparator: '<i class="ivu-icon ivu-icon-ios-arrow-right"></i>',
      }
    },
    mounted () {
      this.getRouteMatched()
    },
    methods: {
      getRouteMatched() {
        let matched = this.$route.matched.filter(item => item.name)
        this.data = this.$route.name === 'home'
          ? matched
          : [{
            name: 'home',
            path: '/home',
            meta: { title: '首页' },
          }].concat(matched)
      }
    },
    watch: {
      $route() {
        this.getRouteMatched()
      }
    }
  }
</script>
