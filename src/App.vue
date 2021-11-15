<template>
  <div id="app">
    <router-view/>
    <hr/>
    <div>
      <router-link to="/detail">明细</router-link> |
      <router-link to="/money">记账</router-link> |
      <router-link to="/statistics">统计</router-link>
    </div>

  </div>
</template>

<style lang="scss">

</style>
