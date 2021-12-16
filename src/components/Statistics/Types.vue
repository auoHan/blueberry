<template>
  <header class="header">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1"/>
    </van-dropdown-menu>
    <ul class="ul-time">
      <li v-for="item in option2" :key="item.value" :class="{selected:item.value===value}"
          @click="selectTime(item.value)">
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {DropdownMenu, DropdownItem} from 'vant';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
@Component
export default class Types extends Vue {
  value1 = '-';
  option1 = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
  value = 'week';
  option2 = [
    {text: '周', value: 'week'},
    {text: '月', value: 'month'},
    {text: '年', value: 'year'},
  ];

  selectTime(value: string) {
    this.value = value;
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.header {
  > .ul-time {
    position: absolute;
    left: 0;
    top: 48px;
    display: flex;
    padding: 10px;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    z-index: 20;
    background-color: $color-navBar;

    > li {
      width: 100%;
      text-align: center;
      padding: 4px 0;
      border: 1px solid #333233;

      &:nth-child(1) {
        border-radius: 10px 0 0 10px;
        border-right: none;
      }

      &:nth-child(3) {
        border-radius: 0 10px 10px 0;
        border-left: none;
      }

      &.selected {
        background-color: #333233;
        color: $color-navBar;
      }
    }
  }
}

::v-deep .van-dropdown-menu__bar {
  box-shadow: none;
  background-color: $color-navBar;
}

::v-deep .van-dropdown-menu__title {

  padding: 12px 30px;
  font-size: 18px;

  &::after {
    right: 16px;
    margin-top: -6px;
    border: 4px solid;
    border-color: transparent transparent #333 #333;
  }
}

::v-deep .van-popup--top {
  top: 53px;
}
</style>