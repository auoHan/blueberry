<template>
  <footer>
    <router-link to="/detail" class="item" active-class="selected">
      <Icon icon-name="detail" class="icon"/>
      明细
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon icon-name="money" class="icon"/>
      记账
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon icon-name="statistics" class="icon"/>
      统计
    </router-link>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class FooterNav extends Vue{

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
footer {
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, .2);
  font-size: 12px;
  > .item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.3333%;
    flex-direction: column;
    padding-top: 6px;
    padding-bottom: 4px;
  }
  > .item.selected{
    color: $color-highLight;
  }
  .icon{
    width: 26px;
    height: 26px;
  }
}
</style>