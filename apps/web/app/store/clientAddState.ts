import { atom } from 'recoil';

export interface UserInfo {
    id: number;
    name: string;
    email: string;
    role: string;
    clientInfo: {
      id: number;
    } | null;
    employeeInfo?: {
      id: number;
    } | null;
}

export const CurrentUserState = atom<UserInfo | null>({
  key: 'CurrentUserState',
  default: null,
});

export const clientAddState = atom<number>({
  key: 'clientAddState',
  default: 0,
});


export const employeeAddState = atom<number>({
  key: 'employeeAddState',
  default: 0,
});

