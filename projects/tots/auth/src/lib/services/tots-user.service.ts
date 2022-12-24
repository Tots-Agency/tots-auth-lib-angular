import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TotsCoreConfig, TOTS_CORE_PROVIDER } from '@tots/core';
import { Observable, switchMap } from 'rxjs';
import { TotsUser } from '../entities/tots-user';
import { TotsAuthService } from './tots-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TotsUserService {

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected config: TotsCoreConfig,
    protected http: HttpClient,
    protected authService: TotsAuthService
  ) {
    
  }

  meUpdateProfile(user: TotsUser): Observable<TotsUser> {
    return this.http.put<TotsUser>(this.config.baseUrl + 'me', user);
  }

  meRefreshProfile(): Observable<TotsUser> {
    return this.http.get<TotsUser>(this.config.baseUrl + 'me')
    .pipe(switchMap(user => this.authService.setUserBasicInStorage(user)));
  }
}
