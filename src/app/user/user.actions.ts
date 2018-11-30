import { Action } from '@ngrx/store';
import {User} from '../user';

export enum UserActionTypes {
  CreateUser = '[Create User] Action',
  UpdateUser = '[Update User] Action',
  DeleteUser = '[Delete User] Action',
}

export class CreateUsers implements Action {
  readonly type = UserActionTypes.CreateUser;
  constructor (public payload: User) {}
}

export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor (public payload: User) {}
}

export class DeleteUsers implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor (public payload: User) {}
}



export type UserActions =   CreateUsers
                          | UpdateUsers
                          | DeleteUsers;
