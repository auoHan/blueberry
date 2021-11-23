import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Detail from '@/views/Detail.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import AddTags from '@/views/AddTags.vue';

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
    path: '/tags',
    component: AddTags,
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
