import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatTableModule, MatPaginatorModule} from '@angular/material';
import {  MatSortModule, MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import { UserTableComponent } from './user-table/user-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@NgModule({
   declarations: [
      AppComponent,
      UserComponent,
      UserTableComponent,
      UserDialogComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      NoopAnimationsModule,
      MatFormFieldModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      FormsModule,
      ReactiveFormsModule,
      MatNativeDateModule,
      MatDatepickerModule,
      StoreModule.forRoot({users: userReducer}),
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
      }),
   ],
   entryComponents: [UserDialogComponent],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
