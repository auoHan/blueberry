<template>
  <div>
    <van-tabs v-model="active" @click="onTab" @rendered="onRendered">
      <van-tab v-for="(week,index) in x" :title="week" :key="index">
        weekIndex:{{ index }}
        week:{{ week }}
<!--        <router-view/>-->
      </van-tab>
    </van-tabs>
    <!--<router-link replace :to="{
    name:'income-month',
    params:{
    data:'2020-1月',
    }
  }">month</router-link>-->
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
      let a = [];
      for (let i = 1; i <= this.$data.lastYearWeek; i++) {
        a.push(this.$data.lastYear + `-${i}周`);
      }
      for (let i = 1; i <= this.$data.thisYearWeek; i++) {
        a.push(this.$data.thisYear + `-${i}周`);
        console.log(this.$data.thisYearWeek);
      }
      return a;
    }
  }
})
export default class Income extends Vue {
  thisYear = dayjs().year();
  thisYearWeek = dayjs().isoWeek();
  lastYear = dayjs((this.thisYear - 1).toString()).year();
  lastYearWeek = dayjs(this.lastYear).isoWeeksInYear();
  active = (this.thisYearWeek+this.lastYearWeek)-1
  latestActive = (this.thisYearWeek+this.lastYearWeek)-1
  mounted() {
    //console.log(dayjs('2020').isoWeek(49));
    // console.log(this.active);
    console.log(dayjs('2021-12-27').isoWeek());
  }
  onTab(name:string,title: string){
    console.log('name:',name,'title:',title);
    //this.$router.replace({name:'income-week',params:{data:title}})
  }
  onRendered(name:number,title: string){
    //name === this.latestActive && this.$router.replace({name:'income-week',params:{data:title}})
    name === this.latestActive && console.log('name:',name,'title:',title);
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .van-tabs__line{
    background-color:#333233;
    width: 44px;
    height: 4px;
    bottom: 20px;
  }
}
</style>