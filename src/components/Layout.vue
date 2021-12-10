<template>
  <div class="layout-wrapper">
    <slot name="header"/>
    <main class="content">
      <slot/>
    </main>
    <FooterNav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Layout extends Vue{

}
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex-grow: 1;
  overflow: auto;
}
</style>