<template>
  <!-- 计算备注 -->
  <div class="remarks-count">
    <!-- 备注 -->
    <div class="remarks">
      <label class="notes">
            <span>
              <Icon icon-name="备注" class="note-icon"/>
              备注:
            </span>
        <input type="text" placeholder="点击写备注...">
      </label>
      <span class="sum">10000000</span>
    </div>
    <!-- 计算 -->
    <div class="buttons">
      <button class="selected">1</button>
      <button>2</button>
      <button>3</button>
      <button>
        <Icon icon-name="日历" class="today"/>
        今天
      </button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>0</button>
      <button>.</button>
      <button>
        <Icon icon-name="backspace" class="backspace"/>
      </button>
      <button>完成</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
name: "RemarksCount",
  data() {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.remarks-count {
  background-color: $color-notSelected;
  width: 100%;
  display: block;

  > .remarks {
    position: relative;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 10px 8px;

    > .notes {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100vh;

      > span {

        > .note-icon {
          display: inline-block;
          vertical-align: middle;
          color: $color-highLight;
        }
      }

      > input {
        margin-left: 4px;
        height: 32px;
        flex-grow: 1;
        padding-right: 100px;
      }
    }

    > .sum {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 20px;
    }

  }

  > .buttons {
    display: flex;
    flex-wrap: wrap;

    > button {
      width: 25%;
      height: 64px;
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;

      &:nth-child(4n) {
        border-right: 0;
      }

      &:nth-child(n+13) {
        border-bottom: 0;
      }

      &:last-child {
        background-color: $color-highLight;
      }

      &.selected {
        background-color: #e1e1e1;
      }

      > .today {
        display: inline-block;
        vertical-align: middle;
        color: $color-highLight;

      }

      > .backspace {
        display: inline-block;
        vertical-align: middle;
        color: $color-highLight;
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>