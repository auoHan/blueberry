<template>
  <!-- 收入支出类型 -->
  <div class="type">
    <ul>
      <li :class="type==='-' && 'selected'" @click="selectType('-')">支出</li>
      <li :class="type==='+' && 'selected'" @click="selectType('+')">收入</li>
    </ul>
    <router-link to="/detail" class="cancel">取消</router-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component,Watch} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  type = '-';

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    } else {
      this.type = type;
    }
  }
  @Watch('type')
  onTypeChanged(value:string){
    this.$emit('value',this.type)
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