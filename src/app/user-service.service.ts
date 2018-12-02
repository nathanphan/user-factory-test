import { Injectable } from '@angular/core';
import { User } from './user';
import { Store } from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {USERS} from './mock-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Observable<User[]>;

  public constructor (private store: Store<User[]>) {
    this.users = this.store.select('users');
  }

  public add(user: User) { }

  public update(user: User) { }

  public delete(user: User) { }

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

}
