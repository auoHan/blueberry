<template>
  <!-- 标签显示 -->
  <div class="tags">
    <!--  支出展示  -->
    <ul class="current">
      <li v-for="(tagName,index) in expense" :key="tagName" @click="addExpenseClass(index,tagName)">
        <Icon :icon-name="tagName" class="tags-icon" :class="index===expenseClass && 'selected'"/>
        <span :class="index===expenseClass && 'selected'">{{ tagName }}</span>
      </li>
      <li @click="addExpenseTags">
        <Icon icon-name="添加" class="tags-icon"/>
        <span>添加</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch, Prop} from 'vue-property-decorator';
import {tagListModel} from '@/models/tagListModel';
import {eventBus} from '@/main';
import PubSub from 'pubsub-js';
import {Toast} from 'vant';

Vue.use(Toast);
@Component
export default class Tags extends Vue {
  @Prop(String) readonly type!: string;
  expenseShow = false;
  expenseClass = -1;
  //'["餐饮", "交通", "日用", "水果", "蔬菜", "购物"]'此处数组里面的元素必须双引号，因为localStorage存储的数组的元素是双引号的
  //tagIcons: string[] = ["餐饮", "交通", "日用", "水果", "蔬菜", "购物"];
  //expense: string[] = JSON.parse(localStorage.getItem('expenseTag') || '["餐饮", "交通", "日用", "水果", "蔬菜", "购物"]');
  expense:string[] = tagListModel.fetch();

  //点击li后添加样式，并传参给RemarksCount组件，控制RemarksCount组件是否显示
  mounted(): void {
    eventBus.$emit('expense-show', this.expenseShow);
  }

  addExpenseClass(index: number, tagName: string) {
    this.expenseClass = index;
    this.expenseShow = true;
    eventBus.$emit('expense-show', this.expenseShow);
    this.$emit('value', tagName);
  }

  //添加支出标签跳转路由
  addExpenseTags() {
    this.$router.push({path: '/expense'});
  }

  created(): void {
    //订阅消息
    PubSub.subscribe('expense-tag', (_: string, newTag: string) => {
      if (this.expense.includes(newTag)) {
        Toast.fail('请勿重复添加');
        return;
      }
      this.expense.push(newTag);
    });
  }

  //expense改变时保存数据
  @Watch('expense')
  onExpenseChange() {
    // localStorage.setItem('expenseTag', JSON.stringify(this.expense));
    tagListModel.save(this.expense);
  }

  @Watch('type')
  onTypeChange() {
    this.expenseShow = false;
    this.expenseClass = -1;
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