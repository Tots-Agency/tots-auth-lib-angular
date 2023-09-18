import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TOTS_AUTH_PROVIDER, TotsAuthConfig } from './entities/tots-auth-config';

@NgModule({
  declarations: [

  ],
  imports: [
    HttpClientModule
  ],
  exports: [

  ],
  providers: [
    {
      provide: TOTS_AUTH_PROVIDER,
      useClass: TotsAuthConfig
    },
  ]
})
export class TotsAuthModule { }
