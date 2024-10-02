import { atom } from 'recoil';

export const clientAddState = atom<number>({
  key: 'clientAddState',
  default: 0,
});


export const employeeAddState = atom<number>({
  key: 'employeeAddState',
  default: 0,
});
