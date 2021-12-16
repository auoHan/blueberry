<template>
  <Layout>
    <template v-slot:header>
      <DetailTabs/>
    </template>

    <template v-slot:default>
      <AmountDetails/>
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
  currentView = 'DetailTabs';
}
</script>

<style lang="scss" scoped>

</style>
