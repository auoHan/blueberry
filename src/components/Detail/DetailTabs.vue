<template>
  <header class="header">
    <span class="title">蓝莓记账</span>
    <ul>
      <li class="time">
        <span>{{ dateSelected.split('/')[0] }}年</span>
        <span @click="dateShow=true">{{ dateSelected.split('/')[1] }}
          <span style="font-size: 12px;">月</span>
          <Icon icon-name="下三角形" class="triangles"/>
        </span>

      </li>
      <li class="income">
        <span>收入</span>
        <span v-html="this.incomeAmount">{{ incomeAmount }}</span>
      </li>
      <li class="expense">
        <span>支出</span>
        <span v-html="this.expenseAmount">{{ expenseAmount }}</span>
      </li>
    </ul>
    <DetailDatePicker @date-picker="datePicker" v-if="dateShow"/>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import { Overlay } from 'vant';
import DetailDatePicker from '@/components/Detail/DetailDatePicker.vue';

Vue.use(Overlay)
@Component({
  components: {DetailDatePicker}
})
export default class DetailsTabs extends Vue {
  incomeAmount = '111111111.00';
  expenseAmount = '111111111.00';
  dateShow = false;
  currentDate = new Date();
  dateSelected = this.dateFormat(this.currentDate);
  created(): void {
    const splitIncome = this.incomeAmount.split('.');
    this.incomeAmount = `${splitIncome[0]}.<span style="font-size:12px;">${splitIncome[1]}</span>`;
    const splitExpense = this.expenseAmount.split('.');
    this.expenseAmount = `${splitExpense[0]}.<span style="font-size:12px;">${splitExpense[1]}</span>`;

  }

  datePicker(event:boolean | any) {
    if (event instanceof Array) {
      this.dateShow = event[0];
      this.dateSelected = event[1];
    }else {
      this.dateShow = event;
    }
  }

  dateFormat(time: string | number | Date) {
    let nowDate = new Date(time);
    let year = nowDate.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    // 拼接
    return year + '/' + month;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.header {
  background-color: $color-navBar;
  > .title {
    text-align: center;
    display: block;
    color: white;
    font-size: 24px;
  }

  > ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 20px;

    > li {
      > span {
        display: block;
        font-size: 20px;
        font-weight: 300;

        &:nth-child(1) {
          font-size: 14px;
          color: #6e633d;
          padding-bottom: 5px;
          font-weight: 0;
        }
      }

      &.time {
        > span {
          &:nth-child(2) {
            border-right: 1px solid #333233;
            padding-right: 12px;

            > .triangles {
              display: inline-block;
              vertical-align: middle;
              padding-left: 4px;
            }
          }
        }
      }

      &.income {
        padding: 0 48px 0 32px;
        width: 45vw;
      }
    }
  }
}
::v-deep {
  .van-overlay {
    top: 112px;
  }
}

</style>