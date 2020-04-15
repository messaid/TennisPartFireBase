import { UserDTO } from './../../models/user';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { EnumHelper } from 'src/app/enums/enum-helper';
export interface IUserState {
    currentuser: UserDTO;
    rankings: Array<EnumDisplayedObject>;
  }

export const initialUserState: IUserState = {
  currentuser: new UserDTO(),
  rankings: EnumHelper.initRankingValues(),
};
