import { atom } from 'recoil';
import { EmployeeInfo } from '../lib/actions/employee';

export const clientAddState = atom<number>({
  key: 'clientAddState',
  default: 0,
});


export const employeeAddState = atom<number>({
  key: 'employeeAddState',
  default: 0,
});
