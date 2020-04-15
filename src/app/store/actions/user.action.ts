import { UserDoc } from './../../models/userDoc';
import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
    '[Session] Set Current User',
    props<{user: UserDoc}>());

export const resetUser = createAction('[Session] Delete Current User display name');

