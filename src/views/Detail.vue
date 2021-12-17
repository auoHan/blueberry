<template>
  <Layout>
    <template v-slot:header>
      <DetailTabs/>
    </template>

    <template v-slot:default>
      <AmountDetails :result="result" :totalAmount="totalAmount"/>
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import DetailTabs from '@/components/Detail/DetailTabs.vue';
import AmountDetails from '@/components/Detail/AmountDetails.vue';
import DetailDatePicker from '@/components/Detail/DetailDatePicker.vue';

@Component({
  components: {DetailDatePicker, AmountDetails, DetailTabs, Layout}
})
export default class Detail extends Vue {
  get records() {
    return this.$store.state.records;
  }

  get result() {
    const {records} = this;
    let hashMoney:HashMoney = {}
    for (let i = 0; i < records.length; i++) {
      hashMoney[records[i].remarksCount[2]] = hashMoney[records[i].remarksCount[2]] || []
      hashMoney[records[i].remarksCount[2]].push({
        date:records[i].remarksCount[2],
        tag: records[i].tag,
        type: records[i].type,
        amount: records[i].remarksCount[0],
        remarks: records[i].remarksCount[1]
      })
    }
    console.log(hashMoney);
    return hashMoney;
  }

  get totalAmount(){
    let incomeAmount = 0;
    let expenseAmount = 0;
    let totalAmount:{[key:string]:{expense:number,income:number}} = {};

    for (let resultKey in this.result) {
      totalAmount[resultKey] = totalAmount[resultKey] || {}
      for (let i = 0; i <this.result[resultKey].length; i++) {
        if (this.result[resultKey][i].type==='+'){
          incomeAmount+=parseFloat(this.result[resultKey][i].amount)
        }else if(this.result[resultKey][i].type==='-'){
          expenseAmount+=parseFloat(this.result[resultKey][i].amount)
        }
      }
      totalAmount[resultKey].income = incomeAmount;
      totalAmount[resultKey].expense = expenseAmount;
      incomeAmount = 0;
      expenseAmount = 0;
    }
    return totalAmount;
  }
  beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }
  mounted(){
    console.log(this.totalAmount);
  }
}
</script>

<style lang="scss" scoped>

</style>
