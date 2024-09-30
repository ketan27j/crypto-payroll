import { atom } from 'recoil';

export const tokenAddState = atom<number>({
  key: 'tokenAddState',
  default: 0,
});

export const walletState = atom<string>({
    key: 'walletState',
    default: "",
  });