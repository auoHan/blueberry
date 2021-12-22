<template>
  <Layout>
    <template v-slot:header>
      <DetailTabs :now-date.sync="nowDate" :monthly-result="monthlyResult"/>
    </template>

    <template v-slot:default>
      <AmountDetails :daily-result="dailyResult" :now-date="nowDate"/>
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

  get dailyResult() {
    const {records} = this;
    let incomeAmount = 0;
    let expenseAmount = 0;
    let dailyTotal: TotalAmount = {};
    let hashMoney: {
      [key: string]: HashMoneyValue[]
    } = {};
    let sortRecords = clone(records).sort((
      first: { remarksCount: string[]; }, second: { remarksCount: string[]; }) =>
      dayjs(second.remarksCount[2]).valueOf() - dayjs(first.remarksCount[2]).valueOf());
    for (let i = 0; i < sortRecords.length; i++) {
      if (this.nowDate === dayjs(sortRecords[i].remarksCount[2]).format('YYYY/M')) {
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

    //计算每天的收入支出
    for (let hashMoneyKey in hashMoney) {
      dailyTotal[hashMoneyKey] = dailyTotal[hashMoneyKey] || {};
      for (let i = 0; i < hashMoney[hashMoneyKey].length; i++) {
        if (hashMoney[hashMoneyKey][i].type === '+') {
          incomeAmount += parseFloat(hashMoney[hashMoneyKey][i].amount);
        } else if (hashMoney[hashMoneyKey][i].type === '-') {
          expenseAmount += parseFloat(hashMoney[hashMoneyKey][i].amount);
        }
      }
      dailyTotal[hashMoneyKey].income = Math.round(incomeAmount*100)/100;
      dailyTotal[hashMoneyKey].expense = Math.round(expenseAmount*100)/100;
      incomeAmount = 0;
      expenseAmount = 0;
    }
    return {hashMoney, dailyTotal};
  }

  get monthlyResult() {
    let incomeAmount = 0;
    let expenseAmount = 0;
    let monthlyTotal: TotalAmount = {};
    monthlyTotal[this.nowDate] = monthlyTotal[this.nowDate] || {};
    if (Object.keys(this.dailyResult.dailyTotal).length === 0) {
      monthlyTotal[this.nowDate] = {expense: 0, income: 0}
    } else {
      for (let dailyTotalKey in this.dailyResult.dailyTotal) {
        expenseAmount += this.dailyResult.dailyTotal[dailyTotalKey].expense;
        incomeAmount += this.dailyResult.dailyTotal[dailyTotalKey].income;
        monthlyTotal[dayjs(dailyTotalKey).format('YYYY/M')].expense = Math.round(expenseAmount*100)/100;
        monthlyTotal[dayjs(dailyTotalKey).format('YYYY/M')].income = Math.round(incomeAmount*100)/100;
      }
    }
    return monthlyTotal;
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
