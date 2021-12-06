<template>
  <!-- money页面 -->
  <div class="money">
    <Types :value.sync="record.type"/>
    <ExpenseTags @value="onUpdateTag" v-if="record.type==='-'"/>
    <IncomeTags @value="onUpdateTag" v-else-if="record.type==='+'"/>
    <RemarksCount @value="onUpdateRemarksCount" @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import ExpenseTags from '@/components/Money/ExpenseTags.vue';
import IncomeTags from '@/components/Money/IncomeTags.vue';
import RemarksCount from '@/components/Money/RemarksCount.vue';
import {model} from '@/model';


@Component({
  components: {IncomeTags, ExpenseTags, RemarksCount, Types}
})
export default class Money extends Vue {
  record: RecordItem = {
    tag: '',
    type: '-',
    remarksCount: []
  };
  //从model的fetch中读取localStorage
  records = model.fetch();

  onUpdateTag(value: string) {
    this.record.tag = value;
    console.log(value);
  }

  onUpdateRemarksCount(value: string[]) {
    this.record.remarksCount = value;
    console.log(value);
  }

  saveRecord() {
    //深拷贝，重新创建一个新的对象
    const deepClone = model.clone(this.record);
    this.records.push(deepClone);
    console.log(this.records);
  }

  //records改变时保存数据
  @Watch('records')
  onRecordsChange() {
    //写入model的save中的localStorage
    model.save(this.records)
  }
}
</script>

<style lang="scss" scoped>


.money {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>