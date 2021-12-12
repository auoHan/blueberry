import { clone } from "@/lib/clone";

const localStorageKeyName = 'records';

const recordListModel = {
  data:[] as RecordItem[],
  createItem(record: RecordItem){
    const deepClone = clone(record);
    this.data.push(deepClone);
  },
  fetch() {
    this.data =  JSON.parse(localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },
  save() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }
};
export {recordListModel};