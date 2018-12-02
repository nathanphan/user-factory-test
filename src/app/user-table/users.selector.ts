import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState} from '../reducers';
import * as fromUsers from '../reducers/index';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
    selectUsersState,
    fromUsers.selectAll,
)

export const selectAllUsersLoaded = createSelector(
    selectUsersState,
    users => users.allUsersLoaded
)
