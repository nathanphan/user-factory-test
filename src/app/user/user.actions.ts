import { Action } from '@ngrx/store';
import {User} from '../user';
import {Update} from '@ngrx/entity';

export enum UserActionTypes {
  CreatedUser = '[Created User] Action',
  CreateUser  = '[Create User In Mock] Action',
  UpdateUser = '[Update User] Action',
  DeleteUser = '[Delete User] Action',
  AllUserRequested = '[User Home] Request All Users',
  AllUserLoaded    = '[User Dump API] All User Loaded',
}

export class CreateUser implements Action {
  readonly type = UserActionTypes.CreateUser;
  constructor (public payload: { user: User }) {}
}

export class CreatedUser implements Action {
  readonly type = UserActionTypes.CreatedUser;
  constructor (public payload: { user: User }) {}
}

export class UpdateUsers implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor (public payload: {user: Update<User>}) {}
}

export class DeleteUsers implements Action {
  readonly type = UserActionTypes.DeleteUser;
  constructor (public payload: {key: number}) {}
}

export class AllUserRequested implements Action {
  readonly type = UserActionTypes.AllUserRequested;
}

export class AllUsersLoaded  implements Action {
  readonly type = UserActionTypes.AllUserLoaded;
  constructor (public payload: {users: User[]}) { }
}


export type UserActions =   CreateUser
                          | CreatedUser
                          | UpdateUsers
                          | DeleteUsers
                          | AllUserRequested
                          | AllUsersLoaded;
