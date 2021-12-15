<template>
  <!-- money页面 -->
  <div class="money">
    <Types :value.sync="record.type" @selected-index="selectedIndex"/>
    <van-swipe
      :loop="false"
      :show-indicators="false"
      @change="onSwipeChange"
      :initial-swipe="swiperIndex"
    >
      <van-swipe-item>
        <ExpenseTags @value="onUpdateTag" :type="record.type"/>
      </van-swipe-item>
      <van-swipe-item>
        <IncomeTags @value="onUpdateTag" :type="record.type"/>
      </van-swipe-item>
    </van-swipe>
    <RemarksCount @value="onUpdateRemarksCount" @submit="saveRecord" :type="record.type"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import ExpenseTags from '@/components/Money/ExpenseTags.vue';
import IncomeTags from '@/components/Money/IncomeTags.vue';
import RemarksCount from '@/components/Money/RemarksCount.vue';
import {Swipe, SwipeItem} from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
@Component({
  components: {IncomeTags, ExpenseTags, RemarksCount, Types},
  computed: {
    records() {
      return this.$store.state.records;
    }
  }
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: '',
    type: '-',
    remarksCount: []
  };
  swiperIndex = '0';

  beforeCreate():void{
    this.$store.commit('fetchRecords');
  }

  //轮播改变的索引值
  onSwipeChange(index: number) {
    this.swiperIndex = index.toString();
    this.record.type === '-' ? this.record.type = '+' : this.record.type = '-';
  }

  //从Type子组件传来选中的index
  selectedIndex(index: number) {
    this.swiperIndex = index.toString();
  }

  onUpdateTag(value: string) {
    this.record.tag = value;
  }

  onUpdateRemarksCount(value: string[]) {
    this.record.remarksCount = value;
  }

  saveRecord() {
    //深拷贝，重新创建一个新的对象
    this.$store.commit('createRecord',this.record);
  }
}
</script>

<style lang="scss" scoped>

.money {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

::v-deep .van-swipe {
  flex: 1;
}

::v-deep .van-swipe-item {
  overflow-y: auto;
}
</style>