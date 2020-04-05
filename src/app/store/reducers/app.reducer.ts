import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { userReducer } from './user.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  user: userReducer,
};
