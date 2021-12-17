<template>
  <ol class="total-list">
    <li v-for="(resultObj,key) in result" :key="key">
      <ol class="date-amount">
        <li class="date">
          <span>{{ key.split('/')[1] + '月' + key.split('/')[2] + '日' }}</span>
          <span>{{
              weekDay[new Date(
                parseInt(key.split('/')[0]),
                parseInt(key.split('/')[1]) - 1,
                parseInt(key.split('/')[2])).getDay()
                ]
            }}</span>
        </li>
        <li class="amount">
          <span v-if="totalAmount[key].income!==0.00">收入：{{ totalAmount[key].income }}</span>
          <span v-if="totalAmount[key].expense!==0.00">支出：{{ totalAmount[key].expense }}</span>
        </li>
      </ol>
      <ol class="amount-list">
        <li v-for="(resultObj,index) in resultObj" :key="index">
          <div class="icon-background">
            <Icon :icon-name="resultObj.tag.name" class="icon"/>
          </div>
          <div class="text">
            <span v-if="resultObj.remarks!==''">{{ resultObj.remarks }}</span>
            <span v-else>{{ resultObj.tag.name }}</span>
            <span v-if="resultObj.type==='+'">{{ resultObj.amount }}</span>
            <span v-else-if="resultObj.type==='-'">-{{ resultObj.amount }}</span>
          </div>
        </li>
      </ol>
    </li>
  </ol>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class AmountDetails extends Vue {
  @Prop(Object) readonly result!: HashMoney;
  @Prop(Object) readonly totalAmount!: { [key: string]: { expense: number, income: number } };
  weekDay = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

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

    > .amount-list {
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
        }
      }
    }
  }
}
</style>