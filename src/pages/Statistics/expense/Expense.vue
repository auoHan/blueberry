<template>
<div>
  支出{{$route.params.date}}
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator'
@Component
export default class Expense extends Vue {
  mounted(){
    console.log(this.$route);
  }
}
</script>

<style lang="scss" scoped>

</style>