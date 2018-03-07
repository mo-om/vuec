<template>
  <div class="chart" style="height:600px">
    <chart :options="lesMiserables" style="width:100%;height:100%" auto-resize></chart>
  </div>
</template>
<script>
  import { AppView, AppSidebar, AppContent } from 'components';
  import axios from 'axios';
  import ECharts from 'vue-echarts';
  import lesMiserables from 'statics/les-miserables';
  export default {
    data () {
      return {
        lesMiserables,
      }
    },
    components: {
      AppView,
      AppSidebar,
      AppContent,
      chart: ECharts,
    },
    methods: {

    }
  }
</script>
