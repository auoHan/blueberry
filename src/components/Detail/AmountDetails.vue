<template>
  <div v-if="Object.keys(dailyResult.hashMoney).length===0" class="empty">
    <Icon icon-name="暂无数据" class="empty-icon"/>
    <span>暂无数据</span>
  </div>
  <ol class="total-list" v-else>
    <li v-for="(values,key) in dailyResult.hashMoney" :key="key">
      <ol class="date-amount">
        <li class="date">
          <span>{{ format(key) }}</span>
          <span>{{ week(key) }}</span>
        </li>
        <li class="total-amount">
          <span v-if="dailyResult.dailyTotal[key].income!==0.00" class="income">收入：{{
              dailyResult.dailyTotal[key].income
            }}</span>
          <span v-if="dailyResult.dailyTotal[key].expense!==0.00" class="expense">支出：{{
              dailyResult.dailyTotal[key].expense
            }}</span>
        </li>
      </ol>
      <ol class="amount-remarks">
        <li v-for="(valueObj,index) in values" :key="index">
          <div class="icon-background">
            <Icon :icon-name="valueObj.tag.name" class="icon"/>
          </div>
          <div class="text">
            <span v-if="valueObj.remarks!==''" class="remarks">{{ valueObj.remarks }}</span>
            <span v-else class="remarks">{{ valueObj.tag.name }}</span>
            <span v-if="valueObj.type==='+'" class="amount">{{ valueObj.amount }}</span>
            <span v-else-if="valueObj.type==='-'" class="amount">-{{ valueObj.amount }}</span>
          </div>
        </li>
      </ol>
    </li>
  </ol>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class AmountDetails extends Vue {
  @Prop(Object) readonly dailyResult?: { hashMoney?: HashMoney, dailyTotal?: TotalAmount};
  @Prop(String) readonly nowDate!: string;
  weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  format(date: string) {
    return dayjs(date).format('M月D日');
  }

  week(date: string) {
    return this.weekDay[dayjs(date).day()];
  }

  /*mounted(){
    console.log(this.resultObj);
  }*/
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

$empty-color: #999;
.empty {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  > .empty-icon {
    width: 100px;
    height: 100px;
    color: $empty-color;
  }

  > span {
    color: $empty-color;
  }
}

.total-list {
  > li {
    &:nth-last-child(1) {
      border-bottom: 1px solid #e9e9e9;
    }

    > .date-amount {
      display: flex;
      justify-content: space-between;
      padding: 5px 16px;
      font-size: 14px;
      color: #969696;
      border-bottom: 2px solid #e1e1e1;

      > .date {
        > span {
          &:nth-child(1) {
            padding-right: 12px;
          }
        }
      }

      > .total-amount {
        > .expense {
          padding-left: 12px;
        }
      }
    }

    > .amount-remarks {
      > li {
        display: flex;
        align-items: center;
        padding: 5px 16px;
        border-bottom: 1px solid #e9e9e9;

        &:nth-last-child(1) {
          border-bottom: none;
        }

        > .icon-background {
          background-color: $color-notSelected;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: relative;

          > .icon {
            position: absolute;
            width: 28px;
            height: 28px;
            left: 50%;
            top: 50%;
            margin: -14px 0 0 -14px;
          }
        }

        > .text {
          //子元素占1个，display:flex才有效果
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          padding-left: 10px;

          > .remarks {
            overflow: hidden;
            word-break: keep-all;
            text-overflow: ellipsis;
            width: 240px;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>