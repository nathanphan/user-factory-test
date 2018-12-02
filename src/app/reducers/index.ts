import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import {User} from '../user';
import {UserActions, UserActionTypes} from '../user/user.actions';
import {USERS} from '../mock-user';

const initializeState: UsersState = {
  data: USERS
};

interface UsersState {
  data: User[];
}

export interface AppState {
  users: UsersState;
}

function uReducer(state: UsersState = initializeState, action: UserActions): UsersState {
  switch (action.type) {
      case UserActionTypes.CreateUser:
          const newData = state.data.slice();
          newData.push(action.payload);
          const newUsersState = {
              data: newData
          };
        return newUsersState;
      default:
        return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
    users: uReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
