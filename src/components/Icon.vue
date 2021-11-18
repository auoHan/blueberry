<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#'+iconName"/>
  </svg>
</template>

<script lang="ts">
// eslint-disable-next-line no-undef
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
try {importAll(require.context('../assets/icons', true, /\.svg$/));} catch (error) {console.log(error);}
export default {
  name: 'Icon',
  props: ['iconName']
};
</script>

<style lang="scss" scoped>
.icon {
  width: 32px; height: 32px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: flex;
  margin-bottom: 2px;
}
</style>