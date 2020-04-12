import { User } from './../../models/user';
export interface IUserState {
    currentuser: User;
  }

export const initialUserState: IUserState = {
  currentuser: new User(),
};
