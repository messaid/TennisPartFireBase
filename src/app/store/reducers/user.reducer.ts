import { initialUserState, IUserState } from './../state/user.state';
import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from '../actions/user.action';

const reducer = createReducer(
  initialUserState,
  on(UserActions.resetUser, state => {
    return { ...state, currentuser: initialUserState.currentuser};
  }),
  on(UserActions.setUser, (state, { user }) => {
    return { ...state, currentuser : user };
  }),
);

export function userReducer(state: IUserState, action: Action) {
  return reducer(state, action);
}
