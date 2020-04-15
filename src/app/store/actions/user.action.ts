import { createAction, props } from '@ngrx/store';
import { UserDTO } from 'src/app/models/user';

export const setUser = createAction(
    '[Session] Set Current User',
    props<{user: UserDTO}>());

export const resetUser = createAction('[Session] Delete Current User display name');

