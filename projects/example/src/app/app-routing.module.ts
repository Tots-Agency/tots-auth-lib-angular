import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBasicPageComponent, TotsBaseLoginPageConfig } from 'projects/tots/auth-layout/src/public-api';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginBasicPageComponent,
    data: {
      pathHome: '/dashboard',
      pathSuccess: '/dashboard',
      hasSavedUser: true
    } as TotsBaseLoginPageConfig
  },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
