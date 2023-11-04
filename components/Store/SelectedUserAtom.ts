import { atom } from 'recoil';
import { User } from '../UserList/user';

export const selectedUserAtom = atom<User | null>({
  key: 'selectedUserAtom',
  default: null,
});
