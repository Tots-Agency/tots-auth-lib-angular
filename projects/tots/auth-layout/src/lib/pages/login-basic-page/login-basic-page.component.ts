import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TotsAuthService, TotsTokenUser, TotsUser } from '@tots/auth';
import { catchError, delay, map, switchMap, tap } from 'rxjs';
import { TotsBaseLoginPageConfig } from '../../entities/tots-base-login-page-config';

export const TOTS_AUTH_LAYOUT_KEY_STORAGE_EMAIL = 'tots.auth.layout.storage';

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
  isSending = true;

  userSaved?: TotsUser;
  step = 1;

  constructor(
    protected route: ActivatedRoute,
    protected authService: TotsAuthService,
    protected router: Router,
    protected formBuilder: UntypedFormBuilder,
    protected storage: StorageMap
  ) { }

  ngOnInit(): void {
    this.loadConfig();
    this.loadForm();
    this.verifyIfSavedUser();
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
      if (error && error.error && error.error.message) {
        this.messageError = error.error.message;
      }
      throw error;
    }))
    .subscribe(res => {
      this.saveUserInBrowser(res);
      this.isSending = false;
      this.router.navigateByUrl(this.config.pathSuccess);
    });

  }

  onClickUserSaved() {
    this.formGroup?.get('email')?.setValue(this.userSaved?.email);
    this.step = 2;
  }

  saveUserInBrowser(user: TotsTokenUser) {
    let data = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      photo: user.photo
    };
    this.storage
    .set(TOTS_AUTH_LAYOUT_KEY_STORAGE_EMAIL, JSON.stringify(data), { type: 'string' })
    .subscribe();
  }

  verifyIfSavedUser() {
    if(!this.config.hasSavedUser){
      this.step = 2;
      return;
    }

    this.storage.get<string>(TOTS_AUTH_LAYOUT_KEY_STORAGE_EMAIL, { type: 'string' })
    .subscribe(data => {
      if(data == undefined||data == ''){
        this.step = 2;
        return;
      }

      this.userSaved = JSON.parse(data);
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

  loadConfig() {
    this.route.data
    .pipe(switchMap(data => {
      this.config = data as TotsBaseLoginPageConfig;
      return this.route.queryParams;
    }))
    .pipe(tap(params => this.processRedirectUrl(params['redirect'])))
    .pipe(switchMap(params => this.authService.getUserFromStorage()))
    .pipe(map(user => {
      if(user.access_token == ''||user.access_token == undefined){
        return false;
      }
      return true;
    }))
    .subscribe(isLogged => {
      this.isSending = false;
      if(isLogged){
        this.router.navigateByUrl(this.config.pathSuccess);
      }
    });
  }
}
