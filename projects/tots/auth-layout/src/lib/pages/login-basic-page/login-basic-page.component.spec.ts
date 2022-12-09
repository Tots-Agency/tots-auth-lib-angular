import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBasicPageComponent } from './login-basic-page.component';

describe('LoginBasicPageComponent', () => {
  let component: LoginBasicPageComponent;
  let fixture: ComponentFixture<LoginBasicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginBasicPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBasicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
