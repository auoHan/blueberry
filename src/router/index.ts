import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Detail from '@/views/Detail.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import ExpenseTags from '@/views/ExpenseTags.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/detail'
  },
  {
    path:'/detail',
    component:Detail,
  },
  {
    path:'/money',
    component:Money,
  },
  {
    path:'/statistics',
    component:Statistics,

  },
  {
    path: '/expense',
    component: ExpenseTags,
  },
  {
    path:'*',
    component:NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
