const localStorageKeyName = 'expenseTag';

const tagListModel = {
  data: [] as string[],
  fetch() {
    this.data = JSON.parse(localStorage.getItem(localStorageKeyName) || '["餐饮", "交通", "日用", "水果", "蔬菜", "购物"]');
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export {tagListModel};