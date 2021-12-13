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
    <main class="tag-pick">
      <ul class="type">
        <li v-for="(icons,key,index) in types" :key="index">
          {{ key }}
          <ul class="type-ul">
            <li v-for="(icon) in icons" :key="icon.id" @click="addActiveClass(icon.id,key,icon.name)">
              <Icon :icon-name="icon.name" class="icon-type"
                    :class="key===activeClassKey && icon.id===activeClassIndex && 'selected'"/>
              <span :class="key===activeClassKey && icon.id===activeClassIndex && 'selected'">{{ icon.name }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {store} from '@/store/index2';
import PubSub from 'pubsub-js';
import {Toast} from 'vant';
import {nanoid} from 'nanoid';

Vue.use(Toast);
@Component
export default class extends Vue {
  //类型分类
  types = {
    学习: [{id: nanoid(10), name: '乐器'}, {id: nanoid(10), name: '书籍'}, {id: nanoid(10), name: '学费'}, {
      id: nanoid(10),
      name: '台灯'
    }, {id: nanoid(10), name: '学习工具'}, {id: nanoid(10), name: '画画'}, {id: nanoid(10), name: '计算器'}],
    办公: [{id: nanoid(10), name: '办公桌'}, {id: nanoid(10), name: '打印机'}, {id: nanoid(10), name: '电脑'}, {
      id: nanoid(10),
      name: '路由器'
    }, {id: nanoid(10), name: '键盘'}, {id: nanoid(10), name: '鼠标'}],
    医疗: [{id: nanoid(10), name: '打针'}, {id: nanoid(10), name: '门诊'}, {id: nanoid(10), name: '检查'}, {
      id: nanoid(10),
      name: '看牙'
    }, {id: nanoid(10), name: '怀孕'}],
    家庭: [{id: nanoid(10), name: '玩具'}, {id: nanoid(10), name: '奶瓶'}, {id: nanoid(10), name: '婴儿车'}, {
      id: nanoid(10),
      name: '奶嘴'
    }],
    家居: [{id: nanoid(10), name: '沙发'}, {id: nanoid(10), name: '热水器'}, {id: nanoid(10), name: '洗衣机'}, {
      id: nanoid(10),
      name: '电视机'
    }, {id: nanoid(10), name: '空调'}, {id: nanoid(10), name: '电灯'}, {id: nanoid(10), name: '工具'}, {
      id: nanoid(10),
      name: '微波炉'
    }],
    健身: [{id: nanoid(10), name: '哑铃'}, {id: nanoid(10), name: '跑步机'}, {id: nanoid(10), name: '跳绳'}, {
      id: nanoid(10),
      name: '瑜伽'
    }, {id: nanoid(10), name: '拳击'}],
  };
  activeClassIndex = '-1';
  activeClassKey = '';
  selectedIcon:Tag = {
    id:'',
    name:''
  };

  //点击Icon添加样式，把当前Icon传给selectedIcon
  addActiveClass(id: string, key: string, name: string) {
    this.activeClassIndex = id;
    this.activeClassKey = key;
    this.selectedIcon = {id,name};
  }

  //返回跳转到Money组件页面
  back() {
    this.selectedIcon = {
      id:'',
      name:''
    };
    this.$router.push({path: '/money'});
  }

  //成功跳转到Money组件页面，并传值，目前还没传
  addTag() {
    if (this.selectedIcon.id==='') {
      Toast.fail('请选择要添加的标签');
      return;
    }else if (store.tagList.map(tagObj=>tagObj.name).includes(this.selectedIcon.name)){
      Toast.fail('请勿重复添加');
      return;
    }
    this.$router.push({path: '/money'})
  }
  beforeDestroy():void{
    //eventBus.$emit('expense-tag', this.selectedIcon)
    //发布消息
    PubSub.publish('expense-tag', this.selectedIcon);
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