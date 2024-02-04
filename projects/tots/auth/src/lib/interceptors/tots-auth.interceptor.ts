import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap } from 'rxjs';
import { TotsCoreConfig, TOTS_CORE_PROVIDER } from '@tots/core';
import { TotsAuthService } from '../services/tots-auth.service';

@Injectable()
export class TotsAuthInterceptor implements HttpInterceptor {

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected config: TotsCoreConfig,
    protected authService: TotsAuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url.indexOf(this.config.baseUrl) == -1){
      return next.handle(request);
    }

    return this.authService.getUserFromStorage()
    .pipe(switchMap(user => next.handle(request.clone({
      setHeaders: { 'Authorization': 'Bearer ' + user.access_token }
    }))))
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.authService.signOut().subscribe();
        }

        throw error;
      })
    );
  }
}
