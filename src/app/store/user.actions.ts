import { Action } from '@ngrx/store';

export const UserActionType = {
  CREATE_USER: '[USER Component] Create User',
  UPATE_USER:  '[USER Component] Update User',
  DELETE_USER: '[USER Component] Delete User'
};

export class CreateUser implements Action {
  readonly type = UserActionType.CREATE_USER;
  constructor(public payload: any) { }
}

export class UpdateUser implements Action {
  readonly type = UserActionType.UPATE_USER;
  constructor(public payload: any) { }
}

export class DeleteUser implements Action {
  readonly type = UserActionType.DELETE_USER;
  constructor(public payload: any) { }
}

export type UserActions =   CreateUser
                          | UpdateUser
                          | DeleteUser;
