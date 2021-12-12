import { nanoid } from 'nanoid'
const localStorageKeyName = 'expenseTag';

const tagListModel = {
  data: [] as Tag[],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName)
      ||  `[{"id":"${nanoid(10)}" ,"name":"餐饮"}, 
            {"id":"${nanoid(10)}" ,"name":"交通"},
            {"id":"${nanoid(10)}" ,"name":"日用"},
            {"id":"${nanoid(10)}" ,"name":"水果"},
            {"id":"${nanoid(10)}" ,"name":"蔬菜"},
            {"id":"${nanoid(10)}" ,"name":"购物"}]`) as Tag[];
    console.log(this.data);
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export {tagListModel};