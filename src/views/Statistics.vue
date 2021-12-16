<template>
  <Layout>
    <template v-slot:header>
      <Types/>
    </template>

    <template v-slot:default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Types from '@/components/Statistics/Types.vue';
@Component({
  components: {Types}
})
export default class Statistics extends Vue{

}
</script>

<style lang="scss" scoped>
</style>