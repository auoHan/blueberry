<template>
  <div class="add-tags">
    <!--  头部  -->
    <ul class="type-nav">
      <li @click="back">
        <Icon icon-name="返回" class="back-icon"/>
        返回
      </li>
      <li>添加支出类别</li>
      <li @click="addTag">完成</li>
    </ul>
    <!--  图标展示区域  -->
    <div class="tag-pick">
      <ul class="type">
        <li v-for="(icons,key,index) in types" :key="index">
          {{ key }}
          <ul class="type-ul">
            <li v-for="(icon,index) in icons" :key="index" @click="addActiveClass(index,key,icon)">
              <Icon :icon-name=icon class="icon-type"
                    :class="key===activeClassKey && index===activeClassIndex && 'selected'"/>
              <span :class="key===activeClassKey && index===activeClassIndex && 'selected'">{{ icon }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import PubSub from 'pubsub-js';

@Component
export default class extends Vue {
  //类型分类
  types = {
    学习: ['乐器', '书籍', '学费', '台灯', '学习工具', '画画', '计算器'],
    办公: ['办公桌', '打印机', '电脑', '路由器', '键盘', '鼠标'],
    医疗: ['打针', '门诊', '检查', '看牙', '怀孕'],
    家庭: ['玩具', '奶瓶', '婴儿车', '奶嘴'],
    家居: ['沙发', '热水器', '洗衣机', '电视机', '空调', '电灯', '工具', '微波炉'],
    健身: ['哑铃', '跑步机', '跳绳', '瑜伽', '拳击'],
  };
  activeClassIndex = -1;
  activeClassKey = '';
  selectedIcon = '';

  //点击Icon添加样式，把当前Icon传给selectedIcon
  addActiveClass(index: number, key: string, icon: string) {
    this.activeClassIndex = index;
    this.activeClassKey = key;
    this.selectedIcon = icon;
    console.log(this.selectedIcon);
  }

  //返回跳转到Money组件页面
  back() {
    this.$router.push({path: '/money'});
  }

  //成功跳转到Money组件页面，并传值，目前还没传
  addTag() {
    //发布消息
    PubSub.publish('add-tag', this.selectedIcon);
    this.$router.push({path: '/money'});
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.add-tags {
  display: flex;
  flex-direction: column;
  height: 100vh;

  > .type-nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: $color-navBar;
    align-items: center;
    padding: 26px 16px 8px;
    font-size: 20px;


    > li:nth-child(1), :nth-child(3) {
      padding: 0 8px;
      font-size: 16px;

      > .back-icon {
        display: inline-block;
        vertical-align: middle;
        width: 16px;
        height: 16px;
        margin-right: -8px;
      }
    }
  }

  > .tag-pick {
    flex-grow: 1;
    padding: 16px 16px;
    overflow: auto;

    > .type {

      > li {
        text-align: center;
        padding: 8px;

        > .type-ul {
          display: flex;
          width: 100%;
          flex-wrap: wrap;

          > li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 20%;
            min-width: 20%;
            max-width: 20%;
            padding: 10px 0;

            > span {
              font-size: 14px;

              &.selected {
                color: $color-highLight;
              }
            }

            > .icon-type {
              width: 40px;
              height: 40px;
              padding: 4px;
              margin-bottom: 4px;
              border-radius: 50%;
              background-color: $color-notSelected;

              &.selected {
                background: $color-highLight;
              }
            }
          }
        }
      }
    }
  }
}
</style>