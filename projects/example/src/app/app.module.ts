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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    TotsCoreModule,
    TotsAuthModule,
    TotsAuthLayoutModule
  ],
  providers: [
    {
      provide: TOTS_CORE_PROVIDER,
      useValue: {
        baseUrl: 'http://0.0.0.0:8080/'
      }
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
