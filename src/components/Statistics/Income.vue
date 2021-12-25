<template>
  <div>
    <MonthChart :option="option"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import MonthChart from '@/components/Statistics/MonthChart.vue';
import dayjs from 'dayjs';
@Component({
  components: {MonthChart}
})
export default class Income extends Vue {
  @Prop(String) readonly type!:string
  @Prop(String) readonly nowDate!:string
  @Prop(Object) readonly dailyResult!: { hashMoney: HashMoney, dailyTotal: TotalAmount };
  @Prop(Object) readonly monthlyResult!: TotalAmount;

  get incomeTotal() {
    if (this.monthlyResult[this.nowDate].income===0) return [{value:0,name:'无'}]
    const hashMoney = this.dailyResult['hashMoney'];
    let everyDay: HashMoneyValue[] = [];
    for (let hashMoneyKey in hashMoney) {
      if (this.nowDate === dayjs(hashMoneyKey).format('YYYY/M'))
        hashMoney[hashMoneyKey].map((item: any) => everyDay.push(item));
    }
    let income = everyDay.filter((item: HashMoneyValue) => item.type === '+');
    let totalObj: { [key: string]: { amount: number } } = {};
    income.map((item: HashMoneyValue) => {
      totalObj[item.tag.name] = totalObj[item.tag.name] || {amount: 0};
      totalObj[item.tag.name].amount += parseFloat(item.amount);
    });
    let data: { value: number, name: string }[] = [];
    for (let totalObjKey in totalObj) {
      data.push({value: totalObj[totalObjKey].amount, name: totalObjKey});
    }
    return data;
  }

  option = {
    title: {
      text: `本月\n总收入：${this.monthlyResult[this.nowDate].income}`,
      left: 'center',
      top:'10px'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: '40px'
    },

    series: [
      {
        type: 'pie',
        radius: '50%',
        data: this.incomeTotal,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },

      }
    ]
  };
}
</script>

<style lang="scss" scoped>

</style>