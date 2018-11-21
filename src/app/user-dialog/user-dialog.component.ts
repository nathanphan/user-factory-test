import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from '../user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user-service.service';

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
  });

  currentId: Number;

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private userService: UserService) {
    this.userForm.patchValue(data);
    this.currentId = data['id'];
  }

  ngOnInit() { }

  public save() {
    const data = this.userForm.value;
    data['id'] = this.currentId;
    this.userService.update(data);
    this.closeDialog();
  }

  private closeDialog() {
    this.dialogRef.close();
  }

}
