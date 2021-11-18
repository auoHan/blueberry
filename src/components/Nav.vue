<template>
  <div class="nav">
    <router-link to="/detail">明细</router-link>
    |
    <router-link to="/money">记账</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
.nav{
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
}
</style>