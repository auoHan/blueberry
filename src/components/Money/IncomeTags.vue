<template>
  <!-- 标签显示 -->
  <div class="tags">
    <!--  收入展示  -->
    <ul class="current">
      <li v-for="(tagName,index) in income" :key="tagName" @click="addIncomeClass(index,tagName)">
        <Icon :icon-name="tagName" class="tags-icon" :class="index===incomeClass && 'selected'"/>
        <span :class="index===incomeClass && 'selected'">{{ tagName }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {eventBus} from '@/main';
import { Toast } from 'vant';

Vue.use(Toast);
@Component
export default class Tags extends Vue {
  incomeShow = false;
  incomeClass = -1;
  income:string[] = ["工资","兼职","理财","其他"];
  mounted():void{
    eventBus.$emit('expense-show', this.incomeShow);
  }
  //点击li后添加样式，并传参给RemarksCount组件，控制RemarksCount组件是否显示
  addIncomeClass(index: number, tagName: string) {
    this.incomeClass = index;
    this.incomeShow = true;
    eventBus.$emit('income-show', this.incomeShow);
    this.$emit('value', tagName);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  padding: 16px 16px;
  flex: 1;
  overflow: auto;

  > .current {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      flex: 1;
      width: 25%;
      min-width: 25%;
      max-width: 25%;

      > span {
        font-size: 14px;

        &.selected {
          color: $color-highLight;
        }
      }

      > .tags-icon {
        background-color: $color-notSelected;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 4px;
        margin-bottom: 4px;

        &.selected {
          background: $color-highLight;
        }
      }
    }
  }
}
</style>