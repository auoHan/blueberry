<template>
  <!-- money页面 -->
  <div class="money">
    <Types/>
    <Tags/>
    <RemarksCount/>
  </div>
</template>

<script lang="ts">
import Types from '@/components/Money/Types.vue';
import Tags from '@/components/Money/Tags.vue';
import RemarksCount from '@/components/Money/RemarksCount.vue';
export default {
  name: 'Money',
  components: {RemarksCount, Tags, Types},
  data() {
    return {
      isShow: true
    };
  },
};
</script>

<style lang="scss" scoped>


.money {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>