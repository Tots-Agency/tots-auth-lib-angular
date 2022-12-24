import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TotsCoreConfig, TOTS_CORE_PROVIDER } from '@tots/core';
import { Observable } from 'rxjs';
import { TotsUser } from '../entities/tots-user';

@Injectable({
  providedIn: 'root'
})
export class TotsUserService {

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected config: TotsCoreConfig,
    protected http: HttpClient,
  ) {
    
  }

  meUpdateProfile(user: TotsUser): Observable<TotsUser> {
    return this.http.put<TotsUser>(this.config.baseUrl + 'me', user);
  }
}
