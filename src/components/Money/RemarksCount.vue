<template>
  <!-- 计算备注 -->
  <div class="remarks-count">
    <DatePicker class="date-picker" v-if="dateShow" @date-picker="datePicker" />
    <!-- 备注 -->
    <div class="remarks">
      <label class="notes">
            <span>
              <Icon icon-name="备注" class="note-icon"/>
              备注:
            </span>
        <input type="text" placeholder="点击写备注...">
      </label>
      <span class="sum">{{ sum }}</span>
    </div>
    <!-- 计算 -->
    <div class="buttons">

      <button v-for="(number,index) in numbers"
              :key="index"
              :class="index===activeClass && 'selected'"
              @mousedown="addActiveClass(index)"
              @mouseup="addActiveClass(-1)"
              @touchstart="addActiveClass(index)"
              @touchend="addActiveClass(-1)"
              @click="buttons(number,index)"
      >
        <Icon icon-name="日历" class="date-icon" v-if="index===3 && number==='今天'"/>
        <Icon icon-name="backspace" class="backspace-icon" v-if="index===14"/>
        {{ number }}
      </button>
      <button v-if="sum.indexOf('+')!==-1 || sum.indexOf('-')!==-1 ">=</button>
      <button v-else>完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import DatePicker from '@/components/Money/DatePicker.vue';

@Component({
  components: {DatePicker}
})
export default class RemarksCount extends Vue {
  sum = '0';
  activeClass = -1;
  dateShow = false;
  numbers = [1, 2, 3, '今天', 4, 5, 6, '+', 7, 8, 9, '-', 0, '.', ''];
  currentDate = new Date();
  dateSelected = this.dateFormat(this.currentDate);
  //鼠标点击或者手指按压按钮，改变当前按钮样式，其他按钮不变
  addActiveClass(index: number) {
    this.activeClass = index;
  }
  //子组件传来的方法，子组件点完取消或确定，立马将父组件里的todayShow变为false
  datePicker(event: any) {
    if (event instanceof Array) {
      this.dateShow = event[0];
      this.dateSelected = event[1];
      /*
      * 此处也是，子组件点完确定，立马改变判断时间是否相同，不同则改变numbers数组，
      * 在按钮中写类似逻辑有BUG，需要第二次点才生效
      * */
      if (this.dateSelected !== this.dateFormat(this.currentDate)){
        this.numbers.splice(3,1,this.dateSelected)
      }else {
        this.numbers = [1, 2, 3, '今天', 4, 5, 6, '+', 7, 8, 9, '-', 0, '.', '']
      }
      console.log(this.dateSelected);
    } else {
      this.dateShow = event;
    }

  }
  //改变当前时间的格式
  dateFormat(time: string | number | Date) {
    let nowDate=new Date(time);
    let year=nowDate.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month= nowDate.getMonth()+1<10 ? "0"+(nowDate.getMonth()+1) : nowDate.getMonth()+1;
    let day=nowDate.getDate()<10 ? "0"+nowDate.getDate() : nowDate.getDate();
    // 拼接
    return year+"/"+month+"/"+day;
  }
  //除了完成按钮之外的按钮逻辑
  buttons(number: number | string | null,index:number) {
    if (index === 3) {
      this.dateShow = true;
    } else if (number === '.') {
      if (this.sum === '0') {
        this.sum = '0.';
      } else {
        if (this.sum.charAt(this.sum.length - 1) !== '+'
          && this.sum.charAt(this.sum.length - 1) !== '-'
          && this.sum.charAt(this.sum.length - 1) !== '.'
          && this.sum.charAt(this.sum.length - 2) !== '.') {
          this.sum += number;
        }
      }
    } else if (number === '') {
      if (this.sum.length === 1) {
        this.sum = '0';
      } else {
        this.sum = this.sum.substring(0, this.sum.length - 1);
      }
    } else if (number === '+') {
      if (this.sum.charAt(this.sum.length - 1) !== '+'
        && this.sum.charAt(this.sum.length - 1) !== '-'
        && this.sum.charAt(this.sum.length - 1) !== '.') {
        this.sum += number;
      }
      if (this.sum.charAt(this.sum.length - 1) === '-') {
        this.sum = this.sum.replace(/[-]$/, '+');
      }
    } else if (number === '-') {
      if (this.sum.charAt(this.sum.length - 1) !== '+'
        && this.sum.charAt(this.sum.length - 1) !== '-'
        && this.sum.charAt(this.sum.length - 1) !== '.') {
        this.sum += number;
      }
      if (this.sum.charAt(this.sum.length - 1) === '+') {
        this.sum = this.sum.replace(/[+]$/, '-');
      }
    } else {
      if (this.sum === '0' && number !== '+' && number !== '-') {
        this.sum = '';
      }
      this.sum += number;
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.remarks-count {
  background-color: $color-notSelected;
  position: relative;

  > .date-picker {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 100%;
  }

  > .remarks {
    position: relative;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    padding: 10px 8px;

    > .notes {
      display: flex;
      flex-direction: row;
      align-items: center;


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

      > .date-icon {
        display: inline-block;
        vertical-align: middle;
        color: $color-highLight;

      }

      > .backspace-icon {
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