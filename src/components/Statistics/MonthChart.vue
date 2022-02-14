<template>
  <div ref="container">

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';

@Component
export default class MonthChart extends Vue {
  @Prop(Object) readonly option!:any

  mounted() {
    let width = document.documentElement.clientWidth
    if (width>500) width=500
    let container:any = this.$refs.container
    container.style.width = `${width}px`
    container.style.height = `${width}px`
    let chart = echarts.init(container,'walden')
    chart.setOption(this.option)
  }

}
</script>

<style lang="scss" scoped>
::v-deep {
  .van-tabs__line {
    background-color: #333233;
    width: 44px;
    height: 2px;
    bottom: 15px;
  }

  .van-tabs--line .van-tabs__wrap {
    border:none;
    border-bottom: 1px solid #e9e9e9;
  }
}
</style>
