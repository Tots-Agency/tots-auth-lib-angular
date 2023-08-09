import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginBasicPageComponent, TotsBaseLoginPageConfig } from 'projects/tots/auth-layout/src/public-api';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TotsAuthGuard } from 'projects/tots/auth/src/public-api';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginBasicPageComponent,
    data: {
      pathHome: '/dashboard',
      pathSuccess: '/dashboard',
      pathRegister: '/auth/register',
      hasSavedUser: true,
      imageLogo: 'assets/icon-1.png',
      hasRegister: true,
      iconAvatarPlaceholder: 'assets/icon_avatar_placeholder.png',
      textPhraseRight: 'Welcome to our community',
      imageRight: 'assets/image_splash3.jpg',
      textSignInWithOtherUser: 'Ingresar con otro usuario...',
      hasRecoveryPassword: true,
    } as TotsBaseLoginPageConfig
  },
  { path: 'dashboard',canActivate: [TotsAuthGuard], component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
