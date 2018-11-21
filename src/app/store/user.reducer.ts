import { User } from '../user';
import { USERS } from '../mock-user';
import { Action } from '@ngrx/store';
import { UserActionType, UserActions } from './user.actions';

export const usersState: User[] = USERS;

export function userReducer(state = usersState, action: UserActions) {
  switch (action.type) {
    case UserActionType.CREATE_USER:
      console.log(action.payload);
      return [...state, action.payload];
    case UserActionType.UPATE_USER:
      let u = action.payload;
      state = state.map(x => x.id === u.id ? u : x);
      return state;
    case UserActionType.DELETE_USER:
        u  = action.payload;
      return state.filter(el => el.id !== u.id);
    default:
      return state;
  }
}
