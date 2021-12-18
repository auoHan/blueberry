<template>
  <Layout>
    <template v-slot:header>
      <DetailTabs :now-date.sync="nowDate"/>
    </template>

    <template v-slot:default>
      <AmountDetails :resultObj="resultObj" :now-date="nowDate"/>
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
import {clone} from '@/lib/clone';
import dayjs from 'dayjs';

@Component({
  components: {DetailDatePicker, AmountDetails, DetailTabs, Layout}
})
export default class Detail extends Vue {
  nowDate = dayjs(new Date()).format('YYYY/M');

  get records() {
    return this.$store.state.records;
  }

  get resultObj() {
    const {records} = this;
    if (records.length === 0) {return {};}
    let incomeAmount = 0;
    let expenseAmount = 0;
    let totalAmount: { [key: string]: { expense: number, income: number } } = {};
    let hashMoney: {
      [key: string]: HashMoneyValue[]
    } = {};
    let sortRecords = clone(records).sort((
      a: { remarksCount: string[]; }, b: { remarksCount: string[]; }) =>
      dayjs(b.remarksCount[2]).valueOf() - dayjs(a.remarksCount[2]).valueOf());
    for (let i = 0; i < sortRecords.length; i++) {
      if (this.nowDate===dayjs(sortRecords[i].remarksCount[2]).format('YYYY/M')){
        hashMoney[sortRecords[i].remarksCount[2]] = hashMoney[sortRecords[i].remarksCount[2]] || [];
        hashMoney[sortRecords[i].remarksCount[2]].push({
          date: sortRecords[i].remarksCount[2],
          tag: sortRecords[i].tag,
          type: sortRecords[i].type,
          amount: sortRecords[i].remarksCount[0],
          remarks: sortRecords[i].remarksCount[1]
        });
      }
    }

    for (let hashMoneyKey in hashMoney) {
      totalAmount[hashMoneyKey] = totalAmount[hashMoneyKey] || {};
      for (let i = 0; i < hashMoney[hashMoneyKey].length; i++) {
        if (hashMoney[hashMoneyKey][i].type === '+') {
          incomeAmount += parseFloat(hashMoney[hashMoneyKey][i].amount);
        } else if (hashMoney[hashMoneyKey][i].type === '-') {
          expenseAmount += parseFloat(hashMoney[hashMoneyKey][i].amount);
        }
      }
      totalAmount[hashMoneyKey].income = incomeAmount;
      totalAmount[hashMoneyKey].expense = expenseAmount;
      incomeAmount = 0;
      expenseAmount = 0;
    }
    console.log(hashMoney, totalAmount);
    return {hashMoney, totalAmount};
  }

  beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }

  /*mounted() {
    console.log(this.resultObj);
  }*/
}
</script>

<style lang="scss" scoped>

</style>
