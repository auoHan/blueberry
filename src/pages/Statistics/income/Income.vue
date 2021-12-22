<template>
<div>
  <van-tabs>
    <van-tab v-for="index in nowWeek" :title="'标签 ' + index" :key="index">
      内容 {{ index }}
    </van-tab>
  </van-tabs>
  收入{{$route.params.date}}
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'
import { Tab, Tabs } from 'vant';
import dayjs from 'dayjs';
import isWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'


Vue.use(Tab);
Vue.use(Tabs);
dayjs.extend(isWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)
@Component
export default class Income extends Vue {
  // beforeWeek = (dayjs().year()-1).isoWeeksInYear()
  nowWeek = dayjs().isoWeek();
  allWeek = [this.nowWeek]
  mounted(){
    const x = (dayjs().year())-1
    console.log(dayjs(2021).isoWeeksInYear());
    console.log(dayjs(2020).isoWeeksInYear());
    console.log(dayjs().isoWeek());
    console.log((dayjs(x).year())-1);
  }
}
</script>

<style lang="scss" scoped>

</style>