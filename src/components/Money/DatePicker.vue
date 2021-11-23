<template>
  <!--<van-popup v-model="show" safe-area-inset-bottom position="bottom">
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
  />
  </van-popup>-->
  <van-popup v-model="dateShow" safe-area-inset-bottom position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
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

Vue.use(DatetimePicker)
Vue.use(Popup)
@Component
export default class Today extends Vue {
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 10, 1);
  currentDate = new Date();
  dateShow = true;
  dateString = '';
  cancelTime(){
    this.dateShow = false;
    this.$emit('date-picker',this.dateShow);
  }
  saveTime(val: { getFullYear: () => any; getMonth: () => number; getDate: () => any; }){
    this.dateShow = false;
    let year = val.getFullYear()
    let month= val.getMonth()+1<10 ? "0"+(val.getMonth()+1) : val.getMonth()+1;
    let day=val.getDate()<10 ? "0"+val.getDate() : val.getDate();
    this.dateString = `${year}/${month}/${day}`
    console.log(new Date());
    this.$emit('date-picker',[this.dateShow,this.dateString]);
    console.log(this.dateString);
  }

}
</script>

<style lang="scss" scoped>

</style>