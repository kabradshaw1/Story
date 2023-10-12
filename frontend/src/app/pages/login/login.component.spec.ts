import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
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

      const emailError = fixture.debugElement.nativeElement.querySelector('.email-error');
      expect(emailError.textContent).toContain('Email is required');
    });

    it('should display an invalid email format error message when email format is incorrect', () => {
      component.loginForm.controls['email'].setValue('invalidEmailFormat');
      component.loginForm.controls['email'].markAsTouched();
      fixture.detectChanges();

      const emailError = fixture.debugElement.nativeElement.querySelector('.email-error-format');
      expect(emailError.textContent).toContain('Please enter a valid email');
    });

    it('should display an invalid password error message when password is less then 8 characters', () => {
      component.loginForm.controls['password'].setValue('passwor');
      component.loginForm.controls['password'].markAsTouched();
      fixture.detectChanges();

      const passwordError = fixture.debugElement.nativeElement.querySelector('.password-error-format');
      expect(passwordError.textContent).toContain('This password is too short')
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

    it('should use the input from the form fields when the button is clicked', () => {
      // Setup the mock
      const authServiceMock = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

      // Find and set input elements
      const emailInput = fixture.debugElement.query(By.css('input[type="email"]')).nativeElement;
      const passwordInput = fixture.debugElement.query(By.css('input[type="password"]')).nativeElement;
      emailInput.value = 'test@example.com';
      passwordInput.value = 'testpassword';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      // Ensure loading is false so button isn't disabled
      component.loading = false;
      fixture.detectChanges();

      // Trigger the button click
      const button = fixture.debugElement.nativeElement.querySelector('button');
      button.click();

      // Run change detection again
      fixture.detectChanges();

      // Assert
      expect(button.disabled).toBeFalse();
      expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'testpassword');
    });


    it('should show a loading indicator when logging in', () => {
      component.loading = true;
      fixture.detectChanges();
      const spinner = fixture.debugElement.nativeElement.querySelector('.loading-spinner');
      expect(spinner).toBeTruthy();
    });

    it('should hide loading indicator if login fails', () => {
      // Arrange: Set the login method of AuthService to return an error.
      authServiceMock.login.and.returnValue(throwError(() => new Error('Invalid credentials')));

      // Assume you have a loading property in your component which shows/hides the spinner.
      // Set it to true initially to simulate the start of the login process.
      component.loading = true;

      // Act: Trigger the login action.
      component.onSubmit();

      // Assert: After the login action fails, the loading spinner should not be visible.
      fixture.detectChanges();
      const spinner = fixture.debugElement.nativeElement.querySelector('.loading-spinner');
      expect(spinner).toBeNull();
      expect(component.loading).toBeFalse(); // If you maintain a 'loading' flag in your component.
    });

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