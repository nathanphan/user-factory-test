import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {pipe} from 'rxjs';
import {UpdateUsers} from '../user/user.actions';
import {Update} from '@ngrx/entity';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    name: new FormControl('', [
      Validators.required,
    ]),
    dateJoined: new FormControl(new Date()),
    id: new FormControl(''),
  });

  currentId: Number;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService, private store: Store<AppState>) {
    this.userForm.patchValue(data);
    this.currentId = data['id'];
  }

  ngOnInit() { }

  public save() {
    const data = this.userForm.value;
    data['id'] = this.currentId;
    this.userService.update(data).subscribe(
        () => {
          const update: Update<User> = {
              id: data['id'],
              changes: data
          }
          this.store.dispatch(new UpdateUsers({user: update}));
        }
    );
    this.closeDialog();
  }

  private closeDialog() {
    this.dialogRef.close();
  }

}
