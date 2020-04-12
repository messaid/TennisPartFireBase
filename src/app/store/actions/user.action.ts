import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';

export const setUser = createAction(
    '[Session] Set Current User',
    props<{user: User}>());

export const resetUser = createAction('[Session] Delete Current User display name');

