<template>
  <!-- popup弹出层 -->
  <van-popup v-model="dateShow"
             safe-area-inset-bottom
             position="bottom"
             @click-overlay="cancelTime">
    <!--  datetime-picker日期选择器  -->
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @cancel="cancelTime"
      @confirm="saveTime"
      v-if="dateShow"
    />
  </van-popup>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {DatetimePicker, Popup} from 'vant';
import 'vant/lib/index.css';
import dayjs from 'dayjs';

Vue.use(DatetimePicker);
Vue.use(Popup);
@Component
export default class Today extends Vue {
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 11, 31);
  currentDate = new Date();
  dateShow = true;

  //取消按钮
  cancelTime() {
    this.dateShow = false;
    this.$emit('date-picker', this.dateShow);
  }

  //确定按钮
  saveTime(value:Date) {
    this.dateShow = false;
    console.log(dayjs(value).format('YYYY/M/D'));
    this.$emit('date-picker', [this.dateShow, dayjs(value).format('YYYY/M/D')]);
  }

  formatter(type:string, val:string) {
    if (type === 'year'){
      return `${val}年`;
    }else if (type === 'month') {
      return `${val}月`;
    } else if (type === 'day') {
      return `${val}日`;
    }
    return val;
  }
}
</script>

<style lang="scss" scoped>

</style>