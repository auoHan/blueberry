import Vue from 'vue'
import Vuex from 'vuex'
import {nanoid} from 'nanoid';
import {clone} from '@/lib/clone';
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    records:[] as RecordItem[],
    tags: [] as Tag[],
  },
  mutations: {
    fetchRecords(state) {
      state.records = JSON.parse(localStorage.getItem('records') || '[]') as RecordItem[];
      return state.records;
    },
    saveRecords(state) {
      localStorage.setItem('records', JSON.stringify(state.records));
    },
    createRecord(state,record: RecordItem){
      const deepClone = clone(record);
      state.records.push(deepClone);
      store.commit('saveRecords');
    },
    fetchTags(state) {
      state.tags = JSON.parse(localStorage.getItem('expenseTag')
        ||  `[{"id":"${nanoid(10)}" ,"name":"餐饮"}, 
            {"id":"${nanoid(10)}" ,"name":"交通"},
            {"id":"${nanoid(10)}" ,"name":"日用"},
            {"id":"${nanoid(10)}" ,"name":"水果"},
            {"id":"${nanoid(10)}" ,"name":"蔬菜"},
            {"id":"${nanoid(10)}" ,"name":"购物"}]`) as Tag[];
      return state.tags;
    },
    createTag(state,newTag:Tag) {
      const deepClone =  clone(newTag);
      state.tags.push(deepClone);
      store.commit('saveTags');
    },
    saveTags(state) {
      localStorage.setItem('expenseTag', JSON.stringify(state.tags));
    }
  },
})
export default store;