import {createSelector} from '@ngrx/store';

export const selectUsersState = state => state.users;

export const userList = createSelector(
    selectUsersState,
    users => users.data
)
