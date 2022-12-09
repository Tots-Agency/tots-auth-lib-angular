import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TotsAuthService } from '@tots/auth';
import { switchMap } from 'rxjs';
import { TotsBaseLoginPageConfig } from '../../entities/tots-base-login-page-config';

@Component({
  selector: 'tots-login-basic-page',
  templateUrl: './login-basic-page.component.html',
  styleUrls: ['./login-basic-page.component.scss']
})
export class LoginBasicPageComponent implements OnInit {

  config!: TotsBaseLoginPageConfig;

  formGroup?: UntypedFormGroup;

  hidePassword = true;

  constructor(
    protected route: ActivatedRoute,
    protected authService: TotsAuthService,
    protected router: Router,
    protected formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.loadConfig();
    this.loadForm();
  }

  onClickLogin() {
    
  }

  loadForm() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  processRedirectUrl(redirect: string) {
    if (
      redirect !== '/login' &&
      redirect !== '/' &&
      redirect !== '' &&
      redirect !== null &&
      redirect !== undefined &&
      redirect !== '%2F' &&
      redirect !== '/login;redirect=%2F'
    ) {
      this.config.pathSuccess = redirect;
    }
  }

  verifyIfLogged() {
    if(this.authService.isLoggedIn.value){
      this.router.navigateByUrl(this.config.pathSuccess);
    }
  }

  loadConfig() {
    this.route.data
    .pipe(switchMap(data => {
      this.config = data as TotsBaseLoginPageConfig;
      return this.route.queryParams;
    }))
    .subscribe(params => {
      this.processRedirectUrl(params['redirect']);
      this.verifyIfLogged();
    });
  }
}
