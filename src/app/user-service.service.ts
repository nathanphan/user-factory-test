import { Injectable } from '@angular/core';
import { User } from './user';
import { USERS } from './mock-user';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreateUser, UpdateUser } from './store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<User[]>;

  public constructor (private store: Store<User[]>) {
    this.users = this.store.select('users');
  }

  /**
   * load
   */
  public load(): Observable<User[]> {
    return this.users;
  }

  public add(user: User) {
    user.id = this.count() + 1;
    this.store.dispatch(new CreateUser(user));
  }

  public update(user: User) {
    this.store.dispatch(new UpdateUser(user));
  }

  public delete(user: User) { }

  private count() {
    let count = 0;
    this.users.subscribe(u => {
      count = u.length;
    });
    return count;
  }

}
