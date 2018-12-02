import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserTableDataSource } from './user-table-datasource';
import { select, Store} from '@ngrx/store';
import { User } from '../user';
import { Observable } from 'rxjs';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { AppState } from '../reducers';
import {selectAllUsers} from './users.selector';
import {AllUserRequested, DeleteUsers} from '../user/user.actions';
import {UserService} from '../user-service.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: UserTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'email', 'dateJoined', 'actions'];

  users: Observable<User[]>;

  public constructor(private store: Store<AppState>,
                     private dialog: MatDialog,
                     private userService: UserService) { }

  ngOnInit() {
      // first store will be empty, so need to dispatch an Action to load data.
      this.store.dispatch(new AllUserRequested());
      // using selector to query data from Store.
      this.users = this.store
          .pipe(
                select(selectAllUsers),
          );
    this.dataSource = new UserTableDataSource(this.paginator, this.sort);

    this.users
        .subscribe(data => {
          this.dataSource.data = data;
          this.paginator._changePageSize(this.paginator.pageSize);
        });
  }

  public edit(user: User) {
    this.dialog.open(UserDialogComponent, {
      data: user
    });
  }

  public delete(user: User) {
    if (confirm('Are you sure')) {
        this.userService.delete(user)
            .subscribe(
            (id) => {
                this.store.dispatch(new DeleteUsers({key: id}));
            }
        );
    }
  }

}
