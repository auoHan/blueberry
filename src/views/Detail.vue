<template>
  <Layout>
    <template v-slot:header>
      <DetailTabs/>
    </template>

    <template v-slot:default>
      <AmountDetails :resultObj="resultObj"/>
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
  get records() {
    return this.$store.state.records;
  }

  get resultObj() {
    const {records} = this;
    if (records.length === 0) {return [];}
    let hashMoney: {
      [key: string]: HashMoneyValue[]
    } = {};
    let sortRecords = clone(records).sort((
      a: { remarksCount: string[]; }, b: { remarksCount: string[]; }) =>
      dayjs(b.remarksCount[2]).valueOf() - dayjs(a.remarksCount[2]).valueOf());
    for (let i = 0; i < sortRecords.length; i++) {
      hashMoney[sortRecords[i].remarksCount[2]] = hashMoney[sortRecords[i].remarksCount[2]] || [];
      hashMoney[sortRecords[i].remarksCount[2]].push({
        date: sortRecords[i].remarksCount[2],
        tag: sortRecords[i].tag,
        type: sortRecords[i].type,
        amount: sortRecords[i].remarksCount[0],
        remarks: sortRecords[i].remarksCount[1]
      });
    }
    return hashMoney;
  }

  beforeCreate(): void {
    this.$store.commit('fetchRecords');
  }

  /*mounted() {

  }*/
}
</script>

<style lang="scss" scoped>

</style>
