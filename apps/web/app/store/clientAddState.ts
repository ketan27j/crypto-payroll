import { atom } from 'recoil';

export const clientAddState = atom<number>({
  key: 'clientAddState',
  default: 0,
});
