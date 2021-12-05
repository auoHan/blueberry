<template>
  <!-- money页面 -->
  <div class="money">
    <Types :value.sync="record.type"/>
    <Tags @value="onUpdateTag"/>
    <RemarksCount @value="onUpdateRemarksCount"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import RemarksCount from '@/components/Money/RemarksCount.vue';

 type Record = {
   tag:string,
   type:string,
   remarksCount:string[]
 }
@Component({
  components: {RemarksCount, Tags, Types}
})
export default class Money extends Vue{
  record:Record = {
    tag:'',
    type:'-',
    remarksCount:[]
  }
  onUpdateTag(value:string){
    this.record.tag = value
    console.log(value);
  }
  onUpdateRemarksCount(value:string[]){
    this.record.remarksCount = value
    console.log(value);
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