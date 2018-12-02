import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { UserService } from '../user-service.service';
import {Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {CreateUser} from './user.actions';
import {Update} from '@ngrx/entity';
import {User} from '../user';

export class MyErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

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

  matcher = new MyErrorMatcher();

  constructor(private userService: UserService, private store: Store<AppState>) { }

  ngOnInit() {}

  public add() {
    if (this.userForm.invalid) {
      return;
    }
    this.userForm.patchValue({id: this.userService.getCurrentTimeStamp(), dateJoined: '2018-11-20'});
    this.userService.add(this.userForm.value);
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

}
