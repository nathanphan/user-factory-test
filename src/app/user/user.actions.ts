import { Action } from '@ngrx/store';
import {User} from '../user';
import {Update} from '@ngrx/entity';

export enum UserActionTypes {
  CreateUser = '[Create User] Action',
  UpdateUser = '[Update User] Action',
  DeleteUser = '[Delete User] Action',
  AllUserRequested = '[User Home] Request All Users',
  AllUserLoaded    = '[User Dump API] All User Loaded',
}

export class CreateUsers implements Action {
  readonly type = UserActionTypes.CreateUser;
  constructor (public payload: { user: User }) {}
}

export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor (public payload: {user: Update<User>}) {}
}

export class DeleteUsers implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor (public payload: {key: Number}) {}
}

export class AllUserRequested implements Action {
  readonly type = UserActionTypes.AllUserRequested;
}

export class AllUsersLoaded  implements Action {
  readonly type = UserActionTypes.AllUserLoaded;
  constructor (public payload: {users: User[]}) { }
}


export type UserActions =   CreateUsers
                          | UpdateUsers
                          | DeleteUsers
                          | AllUserRequested
                          | AllUsersLoaded;
