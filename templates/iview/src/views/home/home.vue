<template>
  <div class="app home-page">
    <app-header></app-header>
    <app-view>
      <app-sidebar>
        <app-menu class="app-menu" mode="vertical" theme="light" :menus="menus"></app-menu>
      </app-sidebar>
      <app-content>
        <h3 class="row-header">关键数据统计</h3>
        <Row class="row-body" :gutter="14">
          <Col span="6" v-for="item in valueCountData" :key="item.name">
            <value-count :class="item.type" :icon="item.icon" :name="item.name" :value="item.value" />
          </Col>
        </Row>
        <h3 class="row-header">快速入口</h3>
        <Row class="row-body" :gutter="14">
          <Col span="8">
            <fast-track />
          </Col>
          <Col span="8">
            <fast-track />
          </Col>
          <Col span="8">
            <fast-track />
          </Col>
        </Row>
        <h3 class="row-header">图表数据展示</h3>
        <Row :gutter="14">
          <Col span="12" style="margin-bottom:14px"><Card dis-hover><chart :options="pie" ref="pie" auto-resize></chart></Card></Col>
          <Col span="12" style="margin-bottom:14px"><Card dis-hover><chart :options="polar" ref="polar" auto-resize></chart></Card></Col>
          <Col span="12"><Card dis-hover><chart :options="scatter" auto-resize></chart></Card></Col>
          <Col span="12"><Card dis-hover><chart :options="radar" auto-resize></chart></Card></Col>
        </Row>
      </app-content>
    </app-view>
  </div>
</template>

<script>
  import { menus } from 'statics/menus';
  import ECharts from 'vue-echarts';
  import { shuffle } from 'lodash';
  // static chart data
  import pie from 'statics/pie'
  import radar from 'statics/radar'
  import polar from 'statics/polar'
  import scatter from 'statics/scatter'

  import ValueCount from './value-count'
  import FastTrack from './fast-track'
  import { valueCountData, fastTrackData } from './data'
  export default {
    data() {
      return {
        menus,
        pie,
        radar,
        polar,
        scatter,
        valueCountData,
        fastTrackData,
      }
    },
    components: {
      chart: ECharts,
      ValueCount,
      FastTrack,
    }
  }
</script>
