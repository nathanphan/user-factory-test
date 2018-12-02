import {ActionReducerMap, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';
import {User} from '../user';
import {UserActions, UserActionTypes} from '../user/user.actions';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';

export interface UsersState extends EntityState<User> {
    allUsersLoaded: boolean,
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

const initializeState: UsersState = adapter.getInitialState({
    allUsersLoaded: false,
});

export interface AppState {
  users: UsersState;
}

function uReducer(state: UsersState = initializeState, action: UserActions): UsersState {
  switch (action.type) {
      case UserActionTypes.AllUserLoaded:
          return adapter.addAll(action.payload.users, {...state, allUsersLoaded: true});
      default:
        return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
    users: uReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

// Export EntityState selector utilities functions.
export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal,
} = adapter.getSelectors();
