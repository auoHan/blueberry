<template>
  <Layout>
    <template v-slot:header>
      <Types/>
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
import Types from '@/components/Detail/Types.vue';
import AmountDetails from '@/components/Detail/AmountDetails.vue';
@Component({
  components: {AmountDetails, Types, Layout}
})
export default class Detail extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
