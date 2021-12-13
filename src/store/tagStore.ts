import {nanoid} from 'nanoid';
import {clone} from '@/lib/clone';
const localStorageKeyName = 'expenseTag';
export const tagStore =  {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(localStorage.getItem(localStorageKeyName)
      ||  `[{"id":"${nanoid(10)}" ,"name":"餐饮"}, 
            {"id":"${nanoid(10)}" ,"name":"交通"},
            {"id":"${nanoid(10)}" ,"name":"日用"},
            {"id":"${nanoid(10)}" ,"name":"水果"},
            {"id":"${nanoid(10)}" ,"name":"蔬菜"},
            {"id":"${nanoid(10)}" ,"name":"购物"}]`) as Tag[];
    return this.tagList;
  },
  createTag(newTag:Tag) {
    const deepClone =  clone(newTag);
    this.tagList.push(deepClone);
    this.saveTags();
  },
  saveTags() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
}
tagStore.fetchTags();