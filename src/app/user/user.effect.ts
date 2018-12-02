import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AllUserRequested, AllUsersLoaded, UserActionTypes} from './user.actions';
import {filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {UserService} from '../user-service.service';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {selectAllUsersLoaded} from '../user-table/users.selector';

@Injectable({
    providedIn: 'root',
})
export class UserEffect {

    @Effect()
    loadAllUsers = this.actions$
        .pipe(
            ofType<AllUserRequested>(UserActionTypes.AllUserRequested),
            withLatestFrom(this.store.pipe(select(selectAllUsersLoaded))),
            filter(([action, allUsersLoaded]) => !allUsersLoaded),
            mergeMap(action => this.userService.loadUsers()),
            map(users => new AllUsersLoaded({users}))
        )


    constructor (private actions$: Actions, private userService: UserService, private store: Store<AppState>) {}
}