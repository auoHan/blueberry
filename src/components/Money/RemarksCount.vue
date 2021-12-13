<template>
  <!-- 计算备注 -->
  <div class="remarks-count" v-if="countShow">
    <DatePicker class="date-picker" v-if="dateShow" @date-picker="datePicker"/>
    <!-- 备注 -->
    <div class="remarks">
      <label class="notes">
            <span>
              <Icon icon-name="备注" class="note-icon"/>
              备注:
            </span>
        <input type="text" placeholder="点击写备注..." v-model="note"/>
      </label>
      <span class="sum">{{ sum }}</span>
    </div>
    <!-- 计算 -->
    <div class="buttons">

      <button v-for="(key,index) in keyboards"
              :key="index"
              :class="index===activeClass && 'selected'"
              @mousedown="addActiveClass(index)"
              @mouseup="addActiveClass(-1)"
              @touchstart="addActiveClass(index)"
              @touchend="addActiveClass(-1)"
              @click="buttons(key,index)"
      >
        <Icon icon-name="日历" class="date-icon" v-if="index===3 && key==='今天'"/>
        <Icon icon-name="backspace" class="backspace-icon" v-if="index===14"/>
        {{ key }}
      </button>
      <button v-if="(sum.charAt(sum.length-1)==='0'
      || sum.charAt(sum.length-1)==='1'
      || sum.charAt(sum.length-1)==='2'
      || sum.charAt(sum.length-1)==='3'
      || sum.charAt(sum.length-1)==='4'
      || sum.charAt(sum.length-1)==='5'
      || sum.charAt(sum.length-1)==='6'
      || sum.charAt(sum.length-1)==='7'
      || sum.charAt(sum.length-1)==='8'
      || sum.charAt(sum.length-1)==='9'
      )
      && (sum.indexOf('+')!==-1
          || sum.indexOf('-')!==-1)
      //首位是减号，是否展示=号，(sum.split('-')).length-1===2判断字符串中的'-'是否大于等于两个
      &&(sum.charAt(0)!=='-' || (sum.split('-')).length-1>=2)"
              @click="amount"
      >=
      </button>
      <button v-else @click="complete">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import DatePicker from '@/components/Money/DatePicker.vue';
import {eventBus} from '@/main';
import {Toast} from 'vant';

Vue.use(Toast);
@Component({
  components: {DatePicker}
})
export default class RemarksCount extends Vue {
  @Prop(String) readonly type!: string;
  sum = '0';
  activeClass = -1;
  dateShow = false;
  countShow = false;
  note = '';
  keyboards = [1, 2, 3, '今天', 4, 5, 6, '+', 7, 8, 9, '-', 0, '.', ''];
  currentDate = new Date();
  dateSelected = this.dateFormat(this.currentDate);

  @Watch('type')
  onTypeChange() {
    this.countShow = false;
  }

  //在实例初始化之后,侦听Tags组件传来的值
  mounted(): void {
    eventBus.$on('expense-show', (expense: boolean) => {
      this.countShow = expense;//箭头函数内部不会产生新的this，这边如果不用=>,this指代eventBus
      this.sum = '0';
    });
    eventBus.$on('income-show', (income: boolean) => {
      this.countShow = income;//箭头函数内部不会产生新的this，这边如果不用=>,this指代eventBus
      this.sum = '0';
    });
  }
  //销毁事件
  beforeDestroy():void{
    eventBus.$off('expense-show');
    eventBus.$off('income-show');
  }
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
      if (this.dateSelected !== this.dateFormat(this.currentDate)) {
        this.keyboards.splice(3, 1, this.dateSelected);
      } else {
        this.keyboards = [1, 2, 3, '今天', 4, 5, 6, '+', 7, 8, 9, '-', 0, '.', ''];
      }
    } else {
      this.dateShow = event;
    }

  }

  //改变当前时间的格式
  dateFormat(time: string | number | Date) {
    let nowDate = new Date(time);
    let year = nowDate.getFullYear();
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate();
    // 拼接
    return year + '/' + month + '/' + day;
  }

  //除了完成按钮之外的按钮逻辑
  buttons(key: number | string | null, index: number) {
    if (index === 3) {
      this.dateShow = true;
    } else if (key === '.') {
      if (this.sum === '0') {
        this.sum = '0.';
      } else if (this.sum.length === 16) {
        return;
      } else {
        if (this.sum.charAt(this.sum.length - 1) !== '+'
          && this.sum.charAt(this.sum.length - 1) !== '-'
          && this.sum.charAt(this.sum.length - 1) !== '.'
          && this.sum.charAt(this.sum.length - 2) !== '.'
          && this.sum.charAt(this.sum.length - 3) !== '.') {
          this.sum += key;
        }
      }

    } else if (key === '') {
      if (this.sum.length === 1) {
        this.sum = '0';
      } else if (this.sum.length === 2 && this.sum.charAt(0) === '-') {
        this.sum = '0';
      } else {
        this.sum = this.sum.substring(0, this.sum.length - 1);
      }
    } else if (key === '+') {
      if (this.sum.length === 16) {
        return;
      }
      if (this.sum.charAt(this.sum.length - 1) !== '+'
        && this.sum.charAt(this.sum.length - 1) !== '-'
        && this.sum.charAt(this.sum.length - 1) !== '.') {
        let sum = eval(this.sum);
        this.sum = (Math.round(sum * 100) / 100).toString() + key;
      }
      if (this.sum.charAt(this.sum.length - 1) === '-') {
        this.sum = this.sum.replace(/[-]$/, '+');
      }
    } else if (key === '-') {
      if (this.sum.length === 16) {
        return;
      }
      if (this.sum.charAt(this.sum.length - 1) !== '+'
        && this.sum.charAt(this.sum.length - 1) !== '-'
        && this.sum.charAt(this.sum.length - 1) !== '.') {
        let sum = eval(this.sum);
        this.sum = (Math.round(sum * 100) / 100).toString() + key;
      }
      if (this.sum.charAt(this.sum.length - 1) === '+') {
        // this.sum = this.sum.replace(/[+]$/, '-');
        this.sum = this.sum.substring(0, this.sum.length - 1) + key;
      }
    } else {
      if (this.sum.length === 16) {
        return;
      }
      if ((this.sum === '0' || this.sum === '0.00') && key !== '+' && key !== '-') {
        this.sum = '';
      }
      //如果最后一位是0，倒数第二位是+或者-，再点击其他的数字则删除最后一位，改为点击的数字
      if (this.sum.charAt(this.sum.length - 1) === '0'
        && (this.sum.charAt(this.sum.length - 2) === '-' || this.sum.charAt(this.sum.length - 2) === '+')
      ) {
        this.sum = this.sum.substring(0, this.sum.length - 1);
      }
      //小数点后面如果是一位则还可以点击数字，如果是两位，则return，如果都不是则点击任何数字有效，保证小数点后面不超过两位
      if (this.sum.charAt(this.sum.length - 2) === '.') {
        this.sum += key;
      } else if (this.sum.charAt(this.sum.length - 3) === '.') {
        return;
      } else {
        this.sum += key;
      }
    }
  }

  //计算总金额
  amount() {
    //字符串"1+1"运算可以用到eval函数，得到的值是number类型的数字
    let sum = eval(this.sum);
    //如果有小数，保留两位小数或者一位小数
    this.sum = (Math.round(sum * 100) / 100).toString();

  }

  //点击完成按钮后传值
  complete() {
    const emitComplete = (sum: string) => {
      this.$emit('value', [sum, this.note, this.dateSelected]);
      this.$emit('submit', [sum, this.note, this.dateSelected]);
    };
    if (this.type === '+' && this.sum.charAt(0) === '-') {
      this.sum = this.sum.substring(1, this.sum.length);
    }
    if (this.sum !== '0'
      && this.sum !== '0.0'
      && this.sum !== '0.'
      && this.sum !== '0.00'
      && this.sum !== '0+'
      && this.sum !== '0-') {
      if (this.sum.charAt(this.sum.length - 1) === '+'
        || this.sum.charAt(this.sum.length - 1) === '-'
        || this.sum.charAt(this.sum.length - 1) === '.') {
        const sum = this.sum.substring(0, this.sum.length - 1);
        emitComplete(sum);
      } else if (this.sum.substring(this.sum.length - 2) === '.0') {
        const sum = this.sum.substring(0, this.sum.length - 2);
        emitComplete(sum);
      } else if (this.sum.substring(this.sum.length - 3) === '.00') {
        const sum = this.sum.substring(0, this.sum.length - 3);
        emitComplete(sum);
      } else {
        this.$emit('value', [this.sum, this.note, this.dateSelected]);
        this.$emit('submit', [this.sum, this.note, this.dateSelected]);
      }
    } else {
      Toast('请输入金额！');
    }
    this.sum = '0';
    console.log('完成');
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