import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { UserTableDataSource } from './user-table-datasource';
import { select, Store} from '@ngrx/store';
import { User } from '../user';
import { Observable } from 'rxjs';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { DeleteUser } from '../store/user.actions';
import { AppState } from '../reducers';
import { userList } from './users.selector';

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

  public constructor(private store: Store<AppState>, private dialog: MatDialog) {
      this.users = this.store
          .pipe(
              // map(state => state.users.data),
              // actually don't need, but for  experiment only. only use Selector when calculating the derived State is needed.
              select(userList)
          );
  }

  ngOnInit() {
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
      this.store.dispatch(new DeleteUser(user));
    }
  }

}
