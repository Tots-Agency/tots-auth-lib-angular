import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TotsCoreModule, TOTS_CORE_PROVIDER } from '@tots/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TotsAuthInterceptor, TotsAuthModule } from '@tots/auth';
import { TotsAuthLayoutModule } from 'projects/tots/auth-layout/src/public-api';
import { TOTS_AUTH_PROVIDER, TotsAuthConfig } from 'projects/tots/auth/src/public-api';

import { TotsRegisterLayoutModule } from 'projects/tots/register-layout/src/public-api';
import { RegisterBasicComponent } from './pages/register-basic/register-basic.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RegisterBasicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    TotsCoreModule,
    TotsAuthModule,
    TotsAuthLayoutModule,
    TotsRegisterLayoutModule,
  ],
  providers: [
    {
      provide: TOTS_CORE_PROVIDER,
      useValue: {
        baseUrl: 'http://0.0.0.0:8000/'
      }
    },
    {
      provide: TOTS_AUTH_PROVIDER,
      useValue: {
        signInPath: 'oauth/token',
        changePasswordPath: 'users/me/password',
      } as TotsAuthConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TotsAuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
