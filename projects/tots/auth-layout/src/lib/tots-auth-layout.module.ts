import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/** Angular Material */
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

/** Pages */
import { LoginBasicPageComponent } from './pages/login-basic-page/login-basic-page.component';


@NgModule({
  declarations: [
    LoginBasicPageComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    LoginBasicPageComponent
  ]
})
export class TotsAuthLayoutModule { }
