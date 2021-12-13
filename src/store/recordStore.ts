import {clone} from '@/lib/clone';
const localStorageKeyName = 'records';
export const recordStore = {
  recordList:[] as RecordItem[],
  fetchRecords() {
    this.recordList =  JSON.parse(localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  saveRecords() {
    localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem){
    const deepClone = clone(record);
    this.recordList.push(deepClone);
    recordStore.saveRecords();
  },
}
recordStore.fetchRecords()
