<template>
  <Layout>
    <template v-slot:header>
      statistics
    </template>

    <template v-slot:default>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
    </template>
  </Layout>
</template>

<script lang="ts">

export default {
  name: 'statistics',
};
</script>

<style lang="scss" scoped>
</style>