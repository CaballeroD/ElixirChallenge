import { atom } from 'recoil';

export const selectedNationalitiesAtom = atom<string[]>({
  key: 'selectedNationalitiesAtom',
  default: [],
});
