<template>
  <!-- 标签显示 -->
  <div class="tags">
    <ul class="current">
      <li v-for="(tagName,index) in tagIcons" :key="tagName" @click="addActiveClass(index,tagName)">
        <Icon :icon-name="tagName" class="tags-icon" :class="index===activeClass && 'selected'"/>
        <span :class="index===activeClass && 'selected'">{{ tagName }}</span>
      </li>
      <li @click="addTags">
        <Icon icon-name="添加" class="tags-icon"/>
        <span>添加</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import {eventBus} from '@/main';
import PubSub from 'pubsub-js';
import { Toast } from 'vant';

Vue.use(Toast);
@Component
export default class Tags extends Vue {
  countShow = false;
  activeClass = -1;

  //'["餐饮", "交通", "日用", "水果", "蔬菜", "购物"]'此处数组里面的元素必须双引号，因为localStorage存储的数组的元素是双引号的
  //tagIcons: string[] = ["餐饮", "交通", "日用", "水果", "蔬菜", "购物"];
  tagIcons: string[] = JSON.parse(localStorage.getItem('addTag') || '["餐饮", "交通", "日用", "水果", "蔬菜", "购物"]');

  //点击li后添加样式，并传参给RemarksCount组件，控制RemarksCount组件是否显示
  addActiveClass(index: number, tagName: string) {
    this.activeClass = index;
    this.countShow = true;
    eventBus.$emit('count-show', this.countShow);
    this.$emit('value', tagName);
  }

  //添加标签跳转路由
  addTags() {
    this.$router.push({path: '/tags'});
  }

  created(): void {
    //订阅消息
    PubSub.subscribe('add-tag', (_: string, newTag: string) => {
      if (this.tagIcons.includes(newTag)){
        Toast.fail('请勿重复添加');
        return;
      }
      this.tagIcons.push(newTag);
    });
  }

  //tagIcons改变时保存数据
  @Watch('tagIcons')
  onTagIconsChange() {
    localStorage.setItem('addTag', JSON.stringify(this.tagIcons));
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