import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TotsAuthService } from '@tots/auth';
import { tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    protected authService: TotsAuthService,
    protected router: Router
  ){}

  onClickLogout() {
    this.authService
    .signOut()
    .pipe(tap(res => this.router.navigateByUrl('/login')))
    .subscribe();
  }
}
