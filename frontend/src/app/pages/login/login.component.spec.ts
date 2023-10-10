import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button that triggers the login method', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(component, 'onSubmit');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  })

  it('should validate email and password fields', () => {
    it('should validate email and password fields', () => {
      component.loginForm.controls['email'].setValue('test');
      component.loginForm.controls['password'].setValue('');

      expect(component.loginForm.controls['email'].valid).toBeFalse();
      expect(component.loginForm.controls['password'].valid).toBeFalse();

      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password');

      expect(component.loginForm.controls['email'].valid).toBeTrue();
      expect(component.loginForm.controls['password'].valid).toBeTrue();
    });
  });

  it('should call AuthService login method on valid form submission', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    authServiceMock.login.and.returnValue(of({ accessToken: 'mock-token' }));

    component.onSubmit();
    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should display an error message on failed login', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password');
    authServiceMock.login.and.returnValue(throwError({ error: 'Invalid credentials' }));

    component.onSubmit();
    fixture.detectChanges();
    const errorMessage = fixture.debugElement.nativeElement.querySelector('.error-message');
    expect(errorMessage.textContent).toContain('Invalid credentials');
  });

});
