<template>
  <Layout>
    <template v-slot:header>
      <StatisticsTabs :value.sync="type"/>
    </template>

    <template v-slot:default>
      <Expense v-if="type==='-'" :type="type" :now-date="nowDate" :daily-result="dailyResult" :monthly-result="monthlyResult" />
      <Income v-else-if="type==='+'" :type="type" :now-date="nowDate" :daily-result="dailyResult" :monthly-result="monthlyResult" />
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import StatisticsTabs from '@/components/Statistics/StatisticsTabs.vue';
import Income from '@/components/Statistics/Income.vue';
import Expense from '@/components/Statistics/Expense.vue';
import dayjs from 'dayjs';
import {clone} from '@/lib/clone';

@Component({
  components: {Expense, Income, StatisticsTabs}
})
export default class Statistics extends Vue {
  type = '-';
  nowDate = dayjs().format('YYYY/M');

  beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }

  get dailyResult() {
    const {records} = this.$store.state;
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
      dailyTotal[hashMoneyKey].income = Math.round(incomeAmount * 100) / 100;
      dailyTotal[hashMoneyKey].expense = Math.round(expenseAmount * 100) / 100;
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
      monthlyTotal[this.nowDate] = {expense: 0, income: 0};
    } else {
      for (let dailyTotalKey in this.dailyResult.dailyTotal) {
        expenseAmount += this.dailyResult.dailyTotal[dailyTotalKey].expense;
        incomeAmount += this.dailyResult.dailyTotal[dailyTotalKey].income;
        monthlyTotal[dayjs(dailyTotalKey).format('YYYY/M')].expense = Math.round(expenseAmount * 100) / 100;
        monthlyTotal[dayjs(dailyTotalKey).format('YYYY/M')].income = Math.round(incomeAmount * 100) / 100;
      }
    }
    return monthlyTotal;
  }
}
</script>

<style lang="scss" scoped>
</style>