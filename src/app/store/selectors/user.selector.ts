import { IUserState } from './../state/user.state';
import { IAppState } from './../state/app.state';
import { createSelector } from '@ngrx/store';

export const selectSession = (state: IAppState) => state.user;

export const selectUser = createSelector(
  selectSession,
  (state: IUserState) => state.currentuser
);

export const selectUserDisplayName = createSelector(
  selectSession,
  (state: IUserState) => state.currentuser.user.displayName
);

export const selectRankings = createSelector(
  selectSession,
  (state: IUserState) => state.rankings
);