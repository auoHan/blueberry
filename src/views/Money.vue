<template>
  <Layout>
    <!-- 收入支出类型 -->
    <div class="type">
      <ul>
        <li class="expense selected">支出</li>
        <li class="income">收入</li>
      </ul>
      <button>取消</button>
    </div>
    <!-- 标签显示 -->
    <div class="tags">
      <ul class="current">
        <li>餐饮</li>
        <li>餐饮</li>
        <li>餐饮</li>
        <li>餐饮</li>
        <li>餐饮</li>
        <li>餐饮</li>
      </ul>
      <!-- 计算备注 -->
      <div>
        <!-- 备注 -->
        <div>
          <label class="notes">
            <span class="name">备注
              <input type="text" placeholder="点击写备注...">
            </span>
          </label>
          <span>0.00</span>
        </div>
        <!-- 计算 -->
        <div .class="count">
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
.type{
  border: 1px solid red;
  padding-top: 12px;
  display: flex;
  flex-direction:row;
  justify-content:center;
  >.expense,.income{
    padding: 22px 16px 14px;
    font-size: 20px;
  }
}
</style>