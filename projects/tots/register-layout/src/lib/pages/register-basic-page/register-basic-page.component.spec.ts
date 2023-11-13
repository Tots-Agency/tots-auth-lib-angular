import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBasicPageComponent } from './register-basic-page.component';

describe('RegisterBasicPageComponent', () => {
  let component: RegisterBasicPageComponent;
  let fixture: ComponentFixture<RegisterBasicPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterBasicPageComponent]
    });
    fixture = TestBed.createComponent(RegisterBasicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
