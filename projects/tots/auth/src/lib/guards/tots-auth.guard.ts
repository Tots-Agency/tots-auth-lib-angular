import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, delay, map, of, take, takeWhile, tap } from 'rxjs';
import { TotsAuthService } from '../services/tots-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TotsAuthGuard implements CanActivate {

    constructor(
      protected authService: TotsAuthService,
      protected router: Router
    ) { }

    processNotLogged() {
      let paramRedirect = window.location.pathname;
      if (paramRedirect.includes('auth/login')) {
        paramRedirect = '';
      }
      // Navigate to the login page with extras
      this.router.navigate(['/auth/login'], { queryParams: { redirect: paramRedirect } });
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.getUserFromStorage()
      .pipe(map(user => {
        if(user.access_token == ''||user.access_token == undefined){
          this.processNotLogged();
          return false;
        }
        return true;
      }));
  }
  
}
