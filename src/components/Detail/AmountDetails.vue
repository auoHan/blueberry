<template>
  <ul class="total-list">
    <li>
      <div class="date-amount">
        <div class="date">
          <span>12月11日</span>
          <span>星期六</span>
        </div>
        <div class="amount">
          <span>收入：123</span>
          <span>支出：456</span>
        </div>
      </div>
      <ul class="amount-list">
        <li>
          <div class="icon-background">
            <Icon icon-name="餐饮" class="icon"/>
          </div>
          <div class="text">
            <span>餐饮</span>
            <span>85</span>
          </div>
        </li>
        <li>
          <div class="icon-background">
            <Icon icon-name="餐饮" class="icon"/>
          </div>
          <div class="text">
            <span>餐饮</span>
            <span>85</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'
@Component
export default class AmountDetails extends Vue {

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.total-list{
  >li{
    &:nth-last-child(1){
      border-bottom: 1px solid #e9e9e9;
    }
    >.date-amount{
      display: flex;
      justify-content: space-between;
      padding: 5px 16px;
      font-size: 14px;
      color: #969696;
      border-bottom: 2px solid #e1e1e1;
      >.date,.amount{
        >span{
          &:nth-child(1){
            padding-right: 12px;
          }
        }
      }
    }
    >.amount-list{
      >li{
        display: flex;
        align-items: center;
        padding: 5px 16px;
        border-bottom: 1px solid #e9e9e9;
        &:nth-last-child(1){
          border-bottom: none;
        }
        >.icon-background{
          background-color: $color-notSelected;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          position: relative;
          >.icon{
            position: absolute;
            width: 28px;
            height: 28px;
            left: 50%;
            top: 50%;
            margin: -14px 0 0 -14px;
          }
        }

        >.text{
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