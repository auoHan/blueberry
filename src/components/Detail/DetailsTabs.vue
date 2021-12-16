<template>
  <header class="header">
    <span class="title">蓝莓记账</span>
    <ul>
      <li class="time">
        <span>2020年</span>
        <span>12
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
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'
@Component
export default class DetailsTabs extends Vue {
  incomeAmount = '111111111.00'
  expenseAmount = '111111111.00'
  created():void{
    const splitIncome = this.incomeAmount.split(".")
    this.incomeAmount = `${splitIncome[0]}.<span style="font-size:12px;">${splitIncome[1]}</span>`;
    const splitExpense = this.expenseAmount.split(".")
    this.expenseAmount = `${splitExpense[0]}.<span style="font-size:12px;">${splitExpense[1]}</span>`;
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.header{
  background-color: $color-navBar;
  >.title{
    text-align: center;
    display:block;
    color: white;
    font-size: 24px;
  }
  >ul {
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
</style>