<template>
  <!-- 标签显示 -->
  <div class="tags">
    <ul class="current">
      <li>
        <Icon icon-name="eat" class="tags-icon selected"></Icon>
        <span class="selected">餐饮</span>
      </li>
      <li>
        <Icon icon-name="eat" class="tags-icon"></Icon>
        <span>餐饮</span>
      </li>
      <li>
        <Icon icon-name="eat" class="tags-icon"></Icon>
        <span>餐饮</span>
      </li>
      <li>
        <Icon icon-name="eat" class="tags-icon"></Icon>
        <span>餐饮</span>
      </li>
      <li>
        <Icon icon-name="eat" class="tags-icon"></Icon>
        <span>餐饮</span>
      </li>
      <li>
        <Icon icon-name="eat" class="tags-icon"></Icon>
        <span>餐饮</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Tags',
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tags {
  padding: 16px 16px;
  flex: 1;
  overflow: auto;

  > .current {
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      flex: 1;
      width: 25%;
      min-width: 25%;
      max-width: 25%;

      > span {
        font-size: 12px;

        &.selected {
          color: $color-highLight;
        }
      }

      > .tags-icon {
        background-color: $color-notSelected;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 4px;
        margin-bottom: 4px;

        &.selected {
          background: $color-highLight;
        }
      }
    }
  }
}
</style>