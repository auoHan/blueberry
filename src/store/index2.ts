import {recordStore} from '@/store/recordStore';
import {tagStore} from '@/store/tagStore';

export const store = {
  ...recordStore,
  ...tagStore
};