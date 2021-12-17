<template>
  <ol class="total-list">
    <li v-for="(values,key) in result" :key="key">
      <ol class="date-amount">
        <li class="date">
          <span>{{ format(key) }}</span>
          <span>{{ week(key) }}</span>
        </li>
        <li class="amount">
          <span v-if="totalAmount[key].income!==0.00">收入：{{ totalAmount[key].income }}</span>
          <span v-if="totalAmount[key].expense!==0.00">支出：{{ totalAmount[key].expense }}</span>
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
  @Prop(Object) readonly result!: HashMoney;
  @Prop(Object) readonly totalAmount!: { [key: string]: { expense: number, income: number } };
  weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

  format(date: string) {
    return dayjs(date).format('MM月DD日');
  }

  week(date: string) {
    return this.weekDay[dayjs(date).day()];
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

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

      > .date, .amount {
        > span {
          &:nth-child(1) {
            padding-right: 12px;
          }
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