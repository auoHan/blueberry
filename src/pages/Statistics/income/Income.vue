<template>
  <div>
    <van-tabs v-if="thisYear">
      <van-tab v-for="(week,index) in x" :title="week" :key="index">
        weekIndex:{{ index }}
        week:{{ week }}
      </van-tab>
    </van-tabs>
    收入{{ $route.params.date }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {Tab, Tabs} from 'vant';
import dayjs from 'dayjs';
import isWeek from 'dayjs/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';


Vue.use(Tab);
Vue.use(Tabs);
dayjs.extend(isWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
@Component({
  computed: {
    x() {
      //console.log(this.$data.allWeek);
      let a = [];
      for (let i = 1; i <= this.$data.lastYearWeek; i++) {
        //console.log(this.$data.lastYear+`年-第${i}周`);
        a.push(this.$data.lastYear + `年-第${i}周`);
      }
      for (let i = 1; i <= this.$data.thisYearWeek; i++) {
        console.log(this.$data.thisYear + `年-第${i}周`);
        a.push(this.$data.thisYear + `年-第${i}周`);
      }
      console.log(a);
      return a;
    }
  }
})
export default class Income extends Vue {
  lastYear = dayjs((dayjs().year() - 1).toString()).year();
  lastYearWeek = dayjs((dayjs().year() - 1).toString()).isoWeeksInYear();
  thisYear = dayjs().year();
  thisYearWeek = dayjs().isoWeek();

  mounted() {
    console.log(dayjs().subtract(1, 'year'));
  }
}
</script>

<style lang="scss" scoped>

</style>