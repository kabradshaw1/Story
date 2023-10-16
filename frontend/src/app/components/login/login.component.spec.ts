import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { By } from '@angular/platform-browser';


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

  describe('input validation', () => {

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

    it('should display a required error message when email is empty', () => {
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['email'].markAsTouched();
      fixture.detectChanges();

      const emailError = fixture.debugElement.nativeElement.querySelector('input[formControlName="email"] + .alert');
      expect(emailError.textContent).toContain('Email is required!');
    });

    it('given_when_then', () => {
      component.loginForm.controls['email'].setValue('plainaddress');
      component.loginForm.controls['email'].markAsTouched();

      fixture.detectChanges();
      const emailError = fixture.debugElement.nativeElement.querySelector('input[formControlName="email"] + .alert');
      expect(emailError.textContent).toContain('This email is not a valid format.');
    })

    it('should display an invalid password error message when password is less then 8 characters', () => {
      component.loginForm.controls['password'].setValue('passwor');
      component.loginForm.controls['password'].markAsTouched();
      fixture.detectChanges();

      const passwordError = fixture.debugElement.nativeElement.querySelector('input[formControlName="password"] + .alert');
      expect(passwordError.textContent).toContain('This password is too short.');

    });


    it('should reject invalid email formats', () => {
      const invalidEmails = [
        "plainaddress",
        "@missingusername.org",
        "username@.com",
        "username@domain.com.",
        "username@.domain.com",
        ".username@domain.com"
        // Add other invalid formats as required
      ];

      for (let email of invalidEmails) {
        component.loginForm.controls['email'].setValue(email);

        // Check if email form control is invalid
        expect(component.loginForm.controls['email'].valid).withContext(`Expected '${email}' to be invalid.`).toBeFalse();
      }
    });
  });

  describe('on form submit', () => {

    it('should bind input values to the loginForm controls', () => {

      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('testpassword');

      const emailValue = component.loginForm.get('email')?.value;
      const passwordValue = component.loginForm.get('password')?.value;

      expect(emailValue).toEqual('test@example.com');
      expect(passwordValue).toEqual('testpassword');
    });


    it('should show a loading indicator when logging in', () => {
      component.loading = true;
      fixture.detectChanges();
      const spinner = fixture.debugElement.nativeElement.querySelector('.loading-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should hide loading indicator if login fails', fakeAsync(() => {
      authServiceMock.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

      component.loading = true;

      component.onSubmit();
      tick();  // Simulates passage of time
      fixture.detectChanges();

      const spinner = fixture.debugElement.nativeElement.querySelector('.loading-spinner');
      expect(spinner).toBeNull();
      expect(component.loading).toBeFalse();
    }));



    it('should display invalid credentials when server returns invalid credentials', async () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password');

      const errorResponse = { error: { message: 'Invalid credentials.' } };
      authServiceMock.login.and.returnValue(throwError(() => errorResponse));

      component.onSubmit();
      await fixture.whenStable();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.nativeElement.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('Invalid credentials.');
    });

    it('should display alternative error message when server response is an error other than invalid credentials', async () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password');

      const errorResponse = { error: { message: 'Any other message.' } };
      authServiceMock.login.and.returnValue(throwError(() => errorResponse));

      component.onSubmit();
      await fixture.whenStable();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.nativeElement.querySelector('.error-message');
      expect(errorMessage.textContent).toContain('An error occurred during login. Please try again.');
    })
  });

  describe('Normal state', () => {
    it('should enable the submit button if the form is valid', () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password123');
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.disabled).toBeFalse();
    });

    it('should have an invalid form on init', () => {
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should disable the submit button if the form is invalid', () => {
      component.loginForm.controls['email'].setValue('');
      component.loginForm.controls['password'].setValue('');
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.disabled).toBeTrue();
    });
  });
});

// const given = describe;
// const when = describe;
// const then = it;

// given('',() => {
//   when('',() => {
//     then('', () => {

//     });
//   });
// });