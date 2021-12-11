const localStorageKeyName = 'expenseTag';

const tagListModel = {
  fetch() {
    return JSON.parse(localStorage.getItem(localStorageKeyName) || '["餐饮", "交通", "日用", "水果", "蔬菜", "购物"]');
  },
  save(data: string[]) {
    localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};
export {tagListModel};