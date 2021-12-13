<template>
  <!-- 标签显示 -->
  <div class="tags">
    <!--  收入展示  -->
    <ul class="current">
      <li v-for="(tagObj) in income" :key="tagObj.id" @click="addIncomeClass(tagObj.id,tagObj.name)">
        <Icon :icon-name="tagObj.name" class="tags-icon" :class="tagObj.id===incomeClass && 'selected'"/>
        <span :class="tagObj.id===incomeClass && 'selected'">{{ tagObj.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import {eventBus} from '@/main';
import {Toast} from 'vant';
import {nanoid} from 'nanoid';

Vue.use(Toast);
@Component
export default class Tags extends Vue {
  @Prop(String) readonly type!: string;
  incomeShow = false;
  incomeClass = '-1';
  income:Tag[] = [{id:nanoid(10) ,name:'工资'},{id:nanoid(10) ,name:'兼职'},{id:nanoid(10) ,name:'理财'},{id:nanoid(10) ,name:'其他'}];


  //点击li后添加样式，并传参给RemarksCount组件，控制RemarksCount组件是否显示
  addIncomeClass(id: string, tagName: string) {
    this.incomeClass = id;
    this.incomeShow = true;
    eventBus.$emit('income-show', this.incomeShow);
    this.$emit('value', tagName);
  }

  @Watch('type')
  onTypeChange() {
    this.incomeShow = false;
    this.incomeClass = '-1';
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  padding: 16px 16px;

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