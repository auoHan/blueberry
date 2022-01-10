<template>
  <header class="header">
    <span class="title">蓝莓记账</span>
    <ul>
      <li class="time">
        <span>{{ year }}年</span>
        <span @click="dateShow = true">{{ month }}
          <span style="font-size: 12px;">月</span>
          <Icon icon-name="下三角形" class="triangles"/>
        </span>

      </li>
      <li class="income">
        <span>收入</span>
        <span>
          <span>{{ this.monthlyResult[this.nowDate].income.toFixed(2).split('.')[0] }}</span>
          <span style="font-size: 12px">.{{ this.monthlyResult[this.nowDate].income.toFixed(2).split('.')[1] }}</span>
        </span>
      </li>
      <li class="expense">
        <span>支出</span>
        <span>
          <span>{{ this.monthlyResult[this.nowDate].expense.toFixed(2).split('.')[0] }}</span>
          <span style="font-size: 12px">.{{ this.monthlyResult[this.nowDate].expense.toFixed(2).split('.')[1] }}</span>
        </span>
      </li>
    </ul>
    <DetailDatePicker @date-picker="datePicker" v-if="dateShow"/>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {Overlay} from 'vant';
import DetailDatePicker from '@/components/Detail/DetailDatePicker.vue';
import dayjs from 'dayjs';
import {eventBus} from '@/main';

Vue.use(Overlay);
@Component({
  components: {DetailDatePicker}
})
export default class DetailsTabs extends Vue {
  @Prop(String) readonly nowDate!: string;
  @Prop(Object) readonly monthlyResult!: TotalAmount;
  dateShow = false;
  year = dayjs(this.nowDate).year();
  month = dayjs(this.nowDate).month() + 1;

  beforeCreate(): void {
    eventBus.$on('selectedAt', (selectedAt:string) => {
      this.year = dayjs(selectedAt).year();
      this.month = dayjs(selectedAt).month() + 1;
      this.$emit('update:now-date', selectedAt);
    });
  }

  beforeDestroy() {
    eventBus.$off('selectedAt');
  }

  datePicker(event: boolean | any) {
    if (event instanceof Array) {
      this.dateShow = event[0];
      this.year = dayjs(event[1]).year();
      this.month = dayjs(event[1]).month() + 1;
      this.$emit('update:now-date', event[1]);
    } else {
      this.dateShow = event;
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.header {
  background-color: $color-navBar;

  > .title {
    text-align: center;
    display: block;
    color: white;
    font-size: 24px;
  }

  > ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 20px;

    > li {
      > span {
        display: block;

        &:nth-child(1) {
          font-size: 14px;
          color: #6e633d;
          padding-bottom: 5px;
          font-weight: 0;
        }
      }

      &.time {
        > span {
          &:nth-child(2) {
            border-right: 1px solid #333233;
            padding-right: 3px;

            > .triangles {
              display: inline-block;
              vertical-align: middle;
              width: 12px;
              height: 12px;
            }
          }
        }
      }

      &.income {
        padding-left: 32px;
        flex: 1;
      }

      &.expense {
        flex: 1;
      }
    }
  }
}

::v-deep {
  .van-overlay {
    top: 106px;
  }
}

</style>
