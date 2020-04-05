import { createAction, props } from '@ngrx/store';

export const setDisplayName = createAction(
    '[Session] Set Current User Login',
    props<{userName: string}>());

export const resetUserDisplayName = createAction('[Session] Delete Current User display name');

