import { Injectable } from '@angular/core';
import { User } from './user';
import { Store } from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {USERS} from './mock-user';
import {CreateUser} from './user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<User[]>;

  public constructor (private store: Store<User[]>) {
    this.users = this.store.select('users');
  }

  public add(user: User): User {
      const newUser: User = {
          id: this.getCurrentTimeStamp(),
          name: user.name,
          email: user.email,
          dateJoined: new Date().toLocaleDateString()
      };
      this.store.dispatch(new CreateUser({user: newUser}));
      return user;
  }

  public update(user: User): Observable<User[]> {
      const id = user.id;
      const index = USERS.findIndex((item) => item.id === id);
      USERS.splice(index, 1, user);
      return of(USERS);
  }

  public delete(user: User): Observable<number> {
      const id = user.id;
      const index = USERS.findIndex((item) => item.id === id);
      USERS.splice(index, 1);
      return of(id);
  }

  private count() {
    let count = 0;
    this.users.subscribe(u => {
      count = u.length;
    });
    return count;
  }

  public loadUsers(): Observable<User[]> {
    return of(USERS);
  }

  public getCurrentTimeStamp() {
      const a = Math.floor(Date.now() / 1000);
      return a;
  }

  public createUser(user: User): Observable<User> {
      USERS.push(user);

      return of(user);
  }

}
