import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TotsAuthService } from '@tots/auth';
import { catchError, switchMap } from 'rxjs';
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
  messageError = '';
  isSending = false;

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
    if(this.isSending){
      return;
    }

    // Limpiar mensaje de error
    this.messageError = '';
    // Verificar si ingreso el email
    if (this.formGroup!.get('email')!.value == '') {
      this.messageError = this.config.textErrorEmail ?? 'You must enter email address';
      return;
    }
    if (this.formGroup!.get('password')!.value == '') {
      this.messageError = this.config.textErrorPassword ?? 'You must password';
      return;
    }

    this.isSending = true;
    this.authService
    .signIn(this.formGroup!.get('email')!.value, this.formGroup!.get('password')!.value)
    .pipe(catchError(error => {
      this.isSending = false;
      if (error && error.message) {
        this.messageError = error.message;
      }
      throw error;
    }))
    .subscribe(res => {
      this.isSending = false;
      this.router.navigateByUrl(this.config.pathSuccess);
    });

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
