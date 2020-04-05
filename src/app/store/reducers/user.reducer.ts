import { initialUserState, IUserState } from './../state/user.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from '../actions/user.action';

const reducer = createReducer(
  initialUserState,
  on(UserActions.resetUserDisplayName, state => (initialUserState)),
  on(UserActions.setDisplayName, (state, { userName }) => {
    return { ...state, displayName : userName };
  }),
);

export function userReducer(state: IUserState, action: Action) {
  return reducer(state, action);
}
