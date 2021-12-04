<template>
  <!-- money页面 -->
  <div class="money">
    <Types @value="onUpdateType"/>
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
@Component({
  components: {RemarksCount, Tags, Types}
})
export default class Money extends Vue{
  tagIcons:string[] = []
  onUpdateTag(value:string){
    console.log(value);
  }
  onUpdateType(value:string){
    console.log(value);
  }
  onUpdateRemarksCount(value:string[]){
    console.log(value );
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