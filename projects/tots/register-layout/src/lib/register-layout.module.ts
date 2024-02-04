import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Angular Material */
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/** Tots Libraries */
import { TotsLoadingModule } from '@tots/loading';

/** Pages */
import { RegisterBasicPageComponent } from './pages/register-basic-page/register-basic-page.component';







@NgModule({
  declarations: [

    /** Pages */
    RegisterBasicPageComponent
  ],
  imports: [
    /** Angular */
    CommonModule,
    RouterModule,

    /** Angular Material */
    MatIconModule,
    MatButtonModule,

    /** Tots Libraries */
    TotsLoadingModule
  ],
  exports: [
    /** Pages */
    RegisterBasicPageComponent
  ]
})
export class TotsRegisterLayoutModule { }
