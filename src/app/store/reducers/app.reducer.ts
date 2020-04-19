import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { userReducer } from './user.reducer';
import { marketReducer } from './market.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  user: userReducer,
  market: marketReducer,
};
