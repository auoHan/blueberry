<template>
  <header class="header">
    <van-dropdown-menu>
      <van-dropdown-item v-model="type" :options="typeOption" @change="onChangeType"/>
    </van-dropdown-menu>
    <ul class="ul-time">
      <li v-for="item in intervalOption" :key="item.value" :class="{selected:item.value===interval}"
          @click="selectedInterval(item.value)">
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {DropdownMenu, DropdownItem} from 'vant';

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
@Component
export default class StatisticsTabs extends Vue {
  tabObj = JSON.parse(window.localStorage.getItem('statistics-tabs') || '{"type":"expense","interval":"week"}')
  type = this.tabObj.type;
  typeOption = [
    {text: '支出', value: 'expense'},
    {text: '收入', value: 'income'},
  ];
  interval = this.tabObj.interval;
  intervalOption = [
    {text: '周', value: 'week'},
    {text: '月', value: 'month'},
    {text: '年', value: 'year'},
  ];

  selectedInterval(value: string) {
    this.interval = value;
    window.localStorage.setItem('statistics-tabs', JSON.stringify({type:this.type,interval:value}));
    this.$router.push({name: `${this.type}`, params: {date: `${value}`}});
    //this.$router.replace({path: `/statistics/${this.type}/${this.interval}`});
  }

  onChangeType(value: string) {
    this.type = value;
    window.localStorage.setItem('statistics-tabs', JSON.stringify({type:value,interval:this.interval}));
    this.$router.push({name: `${value}`, params: {date: `${this.interval}`}});
    //this.$router.replace({path: `/statistics/${this.type}/${this.interval}`});
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.header {
  height: 102px;

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

::v-deep {
  .van-dropdown-menu {
    padding-bottom: 50px;
  }

  .van-dropdown-menu__bar {
    box-shadow: none;
    background-color: $color-navBar;
  }

  .van-dropdown-menu__title {

    padding: 12px 30px;
    font-size: 18px;

    &::after {
      right: 16px;
      margin-top: -6px;
      border: 4px solid;
      border-color: transparent transparent #333 #333;
    }
  }

  .van-popup--top {
    top: 53px;
  }

  .van-dropdown-item__option--active {
    color: $color-navBar;
  }

  .van-dropdown-item__option--active .van-dropdown-item__icon {
    color: $color-navBar;
  }

  .van-dropdown-menu__title--active {
    color: #323233;
  }
}
</style>