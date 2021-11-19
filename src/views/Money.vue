<template>
  <Layout>
    <div class="x">
      <!-- 收入支出类型 -->
      <div class="type">
        <ul>
          <li class="selected">支出</li>
          <li class="">收入</li>
        </ul>
        <button>取消</button>
      </div>
      <!-- 标签显示 -->
      <div class="tags">
        <ul class="current">
          <li>
            <Icon iconName="eat" class="icon selected"></Icon>
            <span class="selected">餐饮</span>
          </li>
          <li>
            <Icon iconName="eat"></Icon>
            <span>餐饮</span>
          </li>
          <li>
            <Icon iconName="eat"></Icon>
            <span>餐饮</span>
          </li>
          <li>
            <Icon iconName="eat"></Icon>
            <span>餐饮</span>
          </li>
          <li>
            <Icon iconName="eat"></Icon>
            <span>餐饮</span>
          </li>
          <li>
            <Icon iconName="eat"></Icon>
            <span>餐饮</span>
          </li>
        </ul>
      </div>
      <!-- 计算备注 -->
      <div>
        <!-- 备注 -->
        <div>
          <label class="notes">
            <span class="name">
              <Icon iconName=""/>
              备注
              <input type="text" placeholder="点击写备注...">
            </span>
          </label>
          <span>0.00</span>
        </div>
        <!-- 计算 -->
        <div class="count">
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>今天</button>
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
          <button>清除</button>
          <button>完成</button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">

export default {
  name: 'Money',
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.type {
  padding-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  background-color: $color-navbar;

  > ul {
    display: flex;

    > li {
      padding: 16px 16px 8px;
      font-size: 20px;
    }

    > .selected {
      border-bottom: 2px solid #333;
    }
  }

  > button {
    position: absolute;
    right: 16px;
    top: 28px;
    font-size: 14px;
  }
}

.tags {
  padding: 16px;
  > .current {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    > li {
      display:flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 0;
      flex: 1;
      width: 25%;
      min-width: 25%;
      max-width: 25%;
      >span{
        font-size: 12px;
      }
      >span.selected{
        color: $color-highlight;
      }
      >.icon{
      background-color: #f5f5f5;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        padding: 4px;
        margin-bottom: 4px;
      }
      >.icon.selected{
        background: $color-highlight;
      }
    }
  }
}
</style>