import Vue from 'vue';
import VueRouter, {RawLocation, RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Detail from '@/views/Detail.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/pages/NotFound.vue';
import ExpenseTags from '@/pages/AddExpenseTags.vue';



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
