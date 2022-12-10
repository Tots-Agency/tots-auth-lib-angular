import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TotsAuthService } from '../services/tots-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TotsAuthGuard implements CanActivate {

  constructor(
    protected authService: TotsAuthService,
    protected router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let isLogged = this.authService.isLoggedIn.value;
      if(!isLogged){
        let paramRedirect = window.location.pathname;
          if (paramRedirect.includes('auth/login')) {
            paramRedirect = '';
          }
          // Navigate to the login page with extras
          this.router.navigate(['/auth/login'], { queryParams: { redirect: paramRedirect } });
      }

      return isLogged;
  }
  
}
