import { Component } from '@angular/core';

@Component({
  selector: 'tots-register-basic-page',
  templateUrl: './register-basic-page.component.html',
  styleUrls: ['./register-basic-page.component.scss']
})
export class RegisterBasicPageComponent {

  isSending = false;

  sectionActive = 0;

  messageError = '';

  constructor() { }

  onClickRegister() {

  }
}
