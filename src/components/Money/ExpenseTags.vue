<template>
  <!-- 标签显示 -->
  <div class="tags">
    <!--  支出展示  -->
    <ul class="current">
      <li v-for="(tagObj) in expense" :key="tagObj.id" @click="addExpenseClass(tagObj.id,tagObj.name)">
        <Icon :icon-name="tagObj.name" class="tags-icon" :class="tagObj.id===expenseClass && 'selected'"/>
        <span :class="tagObj.id===expenseClass && 'selected'">{{ tagObj.name }}</span>
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
import {store} from '@/store/index2';
import {eventBus} from '@/main';
import PubSub from 'pubsub-js';
import {Toast} from 'vant';

Vue.use(Toast);
@Component
export default class Tags extends Vue {
  @Prop(String) readonly type!: string;
  expenseShow = false;
  expenseClass = '-1';
  tokenId = '';
  expense = store.tagList;

  created(): void {
    //订阅消息
    this.tokenId = PubSub.subscribe('expense-tag', (_: string, newTag: Tag) => {
      if (newTag.id===''){
        return;
      }
      store.createTag(newTag);
    });
  }

  beforeDestroy(): void {
    PubSub.unsubscribe(this.tokenId);
  }

  //点击li后添加样式，并传参给RemarksCount组件，控制RemarksCount组件是否显示
  addExpenseClass(id: string, tagName: string) {
    this.expenseClass = id;
    this.expenseShow = true;
    eventBus.$emit('expense-show', this.expenseShow);
    this.$emit('value', tagName);
  }

  //添加支出标签跳转路由
  addExpenseTags() {
    this.$router.push({path: '/expense'});
  }

  @Watch('type')
  onTypeChange() {
    this.expenseShow = false;
    this.expenseClass = '-1';
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