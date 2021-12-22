import Vue from 'vue';
import VueRouter, {RawLocation, RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Detail from '@/views/Detail.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/pages/NotFound.vue';
import ExpenseTags from '@/pages/AddExpenseTags.vue';
import Expense from '@/pages/Statistics/expense/Expense.vue';
import Income from '@/pages/Statistics/income/Income.vue';


Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location: RawLocation) {
  // @ts-ignore
  return originalPush.call(this, location).catch(err => err);
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/detail'
  },
  {
    path: '/detail',
    component: Detail,
  },
  {
    path: '/money',
    component: Money,
  },
  {
    path: '/statistics',
    component: Statistics,
    redirect: () => {
      let statisticsTabs = JSON.parse(window.localStorage.getItem('statistics-tabs') || '{"type":"expense","interval":"week"}');
      return `/statistics/${statisticsTabs.type}/${statisticsTabs.interval}`;
    },
    children: [
      {
        name: 'expense',
        path: 'expense/:date',
        component: Expense
      },
      {
        name: 'income',
        path: 'income/:date',
        component: Income
      },
    ]
  },
  {
    path: '/money/expense',
    component: ExpenseTags,
  },
  {
    path: '*',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
