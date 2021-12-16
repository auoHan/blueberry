<template>
  <!-- 收入支出类型 -->
  <div class="type">
    <ul>
      <li :class="value==='-' && 'selected' " @click="selectType('-',0)">支出</li>
      <li :class="value==='+' && 'selected' " @click="selectType('+',1)">收入</li>
    </ul>
    <router-link to="/detail" class="cancel">取消</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class MoneyTabs extends Vue {
  @Prop(String) readonly value!: string;

  selectType(type: string, index: number) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    //父组件中用到了.sync的话，子组件中的发射事件名称必须为update:开头，加上事件名
    this.$emit('update:value', type);
    this.$emit('selected-index', index);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
//type类型栏
.type {
  padding-top: 10px;
  width: 100%;
  background-color: $color-navBar;

  > ul {
    display: flex;
    flex-direction: row;
    justify-content: center;

    > li {
      padding: 16px 16px 8px;
      font-size: 20px;
      position: relative;

      &.selected {
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #333;
        }
      }
    }
  }

  > .cancel {
    position: absolute;
    right: 16px;
    top: 28px;
    font-size: 14px;
    color: #333;
  }
}
</style>