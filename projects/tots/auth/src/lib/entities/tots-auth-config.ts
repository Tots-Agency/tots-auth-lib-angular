import { Injectable, InjectionToken } from "@angular/core";

export const TOTS_AUTH_PROVIDER = new InjectionToken<TotsAuthConfig>('tots.auth');

@Injectable()
export class TotsAuthConfig {
  signInPath: string = 'auth/login';
}
