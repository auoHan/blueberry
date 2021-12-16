<template>
  <Layout>
    <template v-slot:header>
      <DetailsTabs/>
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
import DetailsTabs from '@/components/Detail/DetailsTabs.vue';
import AmountDetails from '@/components/Detail/AmountDetails.vue';
@Component({
  components: {AmountDetails, DetailsTabs, Layout}
})
export default class Detail extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
