import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TotsCoreConfig, TOTS_CORE_PROVIDER } from '@tots/core';
import { map, Observable, switchMap, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { TotsTokenUser } from '../entities/tots-token-user';
import { TotsUser } from '../entities/tots-user';
import { TOTS_AUTH_PROVIDER, TotsAuthConfig } from '../entities/tots-auth-config';

export const TOTS_AUTH_KEY_STORAGE_TOKEN = 'tots.auth.storage';

@Injectable({
  providedIn: 'root'
})
export class TotsAuthService {

  public isLoggedIn = new BehaviorSubject<boolean>(false);
  public currentUser = new BehaviorSubject<TotsTokenUser>(new TotsTokenUser());

  constructor(
    @Inject(TOTS_CORE_PROVIDER) protected config: TotsCoreConfig,
    @Inject(TOTS_AUTH_PROVIDER) protected configAuth: TotsAuthConfig,
    protected http: HttpClient,
    protected storage: StorageMap
  ) {
    this.init();
  }

  changePassword(oldPassword: string, newPassword: string): Observable<TotsUser> {
    return this.http.post<TotsUser>(this.config.baseUrl + (this.configAuth?.changePasswordPath ?? 'auth/change-password'), { old_password: oldPassword, password: newPassword });
  }

  signIn(email: string, password: string): Observable<TotsTokenUser> {
    return this.http.post<TotsTokenUser>(this.config.baseUrl + (this.configAuth?.signInPath ?? 'auth/login'), { email: email, password: password })
    .pipe(tap(user => this.saveUserInStorage(user)))
    .pipe(tap(user => this.isLoggedIn.next(true)))
    .pipe(tap(user => this.currentUser.next(user)));
  }

  signOut(): Observable<any> {
    return this.removeUserInStorage()
    .pipe(tap(res => this.isLoggedIn.next(false)))
    .pipe(tap(res => this.currentUser.next(new TotsTokenUser())));
  }

  saveUserInStorage(user: TotsTokenUser) {
    this.setUserInStorage(user).subscribe();
  }

  setUserInStorage(user: TotsTokenUser): Observable<any> {
    return this.storage.set(TOTS_AUTH_KEY_STORAGE_TOKEN, JSON.stringify(user), { type: 'string' });
  }

  setUserBasicInStorage(user: any): Observable<any> {
    return this.getUserFromStorage()
    .pipe(map(token => {
      user.access_token = token.access_token;
      user.token_type = token.token_type;
      return user;
    }))
    .pipe(switchMap(token => this.setUserInStorage(token)));
  }

  getUserFromStorage(): Observable<TotsTokenUser> {
    return this.storage.get<string>(TOTS_AUTH_KEY_STORAGE_TOKEN, { type: 'string' })
    .pipe(map(data => {
      if(data == undefined||data == ''){
        return new TotsTokenUser();
      }
      return JSON.parse(data);
    }));
  }

  removeUserInStorage(): Observable<any> {
    return this.storage.delete(TOTS_AUTH_KEY_STORAGE_TOKEN);
  }

  init() {
    this.getUserFromStorage()
    .pipe(tap(user => {
      if(user.access_token == ''||user.access_token == undefined){
        throw 'User not logged';
      }
    }))
    .pipe(tap(user => this.isLoggedIn.next(true)))
    .pipe(tap(user => this.currentUser.next(user)))
    .subscribe();
  }
}
