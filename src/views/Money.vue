<template>
  <!-- money页面 -->
  <div class="money">
    <Types :value.sync="record.type"/>
    <Tags @value="onUpdateTag"/>
    <RemarksCount @value="onUpdateRemarksCount" @submit="saveRecord"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import RemarksCount from '@/components/Money/RemarksCount.vue';

type Record = {
  tag: string,
  type: string,
  remarksCount: string[]
}
@Component({
  components: {RemarksCount, Tags, Types}
})
export default class Money extends Vue {
  record: Record = {
    tag: '',
    type: '-',
    remarksCount: []
  };
  records: Record[] = JSON.parse(localStorage.getItem('records') || '[]');

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
    const deepClone = JSON.parse(JSON.stringify(this.record));
    this.records.push(deepClone);
    console.log(this.records);
  }

  //records改变时保存数据
  @Watch('records')
  onRecordsChange() {
    localStorage.setItem('records', JSON.stringify(this.records));
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