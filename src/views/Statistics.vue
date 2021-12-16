<template>
  <Layout>
    <template v-slot:header>
      <StatisticsTabs/>
    </template>

    <template v-slot:default>
      <div class="main">
        <p>A paragraph for the main content.</p>
        <p>And another one.</p>
      </div>
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import StatisticsTabs from '@/components/Statistics/StatisticsTabs.vue';
@Component({
  components: {StatisticsTabs}
})
export default class Statistics extends Vue{

}
</script>

<style lang="scss" scoped>
</style>