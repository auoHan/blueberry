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
import Layout from '@/components/Layout.vue';
import Types from '@/components/Detail/Types.vue';
@Component({
  components: {Types, Layout}
})
export default class Detail extends Vue {

}
</script>

<style lang="scss" scoped>

</style>
