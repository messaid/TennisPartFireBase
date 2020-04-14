import { User } from './../../models/user';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { EnumHelper } from 'src/app/enums/enum-helper';
export interface IUserState {
    currentuser: User;
    rankings: Array<EnumDisplayedObject>;
  }

export const initialUserState: IUserState = {
  currentuser: new User(),
  rankings: EnumHelper.initRankingValues(),
};
