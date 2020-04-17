import { UserDoc } from './../../models/userDoc';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { EnumHelper } from 'src/app/enums/enum-helper';
export interface IUserState {
    currentuser: UserDoc;
    rankings: Array<EnumDisplayedObject>;
    products: Array<EnumDisplayedObject>;
  }

export const initialUserState: IUserState = {
  currentuser: new UserDoc(),
  rankings: EnumHelper.initRankingValues(),
  products: EnumHelper.initProductValues(),
};
