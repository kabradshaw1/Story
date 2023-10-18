import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceMock = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [{ provide: AuthService, useValue: authServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.loading = false; // Reset the loading state
    component.message = ''; // Reset any messages
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input validation', () => {

    it('givenEmptyForm_whenFormIsChecked_thenReturnsFalse', () => {
      component.registerForm.controls['email'].setValue('');
      component.registerForm.controls['password'].setValue('');
      component.registerForm.controls['username'].setValue('');

      expect(component.registerForm.controls['email'].valid).toBeFalse();
      expect(component.registerForm.controls['password'].valid).toBeFalse();
      expect(component.registerForm.controls['username'].valid).toBeFalse();
    });

    it('givenFilledForm_whenFormIsChecked_thenReturnTrue', () => {
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('testPassword');
      component.registerForm.controls['username'].setValue('testUser');

      expect(component.registerForm.controls['email'].valid).toBeTrue();
      expect(component.registerForm.controls['password'].valid).toBeTrue();
      expect(component.registerForm.controls['username'].valid).toBeTrue();
    });

    it('givenNoEmail_whenValidatingEmail_thenDisplayErrorMessage', () => {
      component.registerForm.controls['email'].setValue('');
      component.registerForm.controls['email'].markAsTouched();
      fixture.detectChanges();

      const emailError = fixture.debugElement.query(By.css('input[formControlName="email"] + .alert')).nativeElement;
      expect(emailError.textContent).toContain('Email is required');
    });

    it('givenNoPassword_whenValidatingPassword_thenDisplayErrorMessage', () => {
      component.registerForm.controls['password'].setValue('');
      component.registerForm.controls['password'].markAsTouched();

      fixture.detectChanges();
      const passwordError = fixture.debugElement.query(By.css('input[formControlName="password"] + .alert')).nativeElement;
      expect(passwordError.textContent).toContain('Password is required');
    });

    it('givenShortPassword_whenValidatingPassword_thenDisplayErrorMessage', () => {
      component.registerForm.controls['password'].setValue('pass');
      component.registerForm.controls['password'].markAsTouched();

      fixture.detectChanges();
      const passwordError = fixture.debugElement.query(By.css('input[formControlName="password"] + .alert')).nativeElement;
      expect(passwordError.textContent).toContain('This password is too short.');
    });

    it('giveInvalidEmail_whenFormIsChecked_thenReturnFalse', () => {
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
        component.registerForm.controls['email'].setValue(email);

        // Check if email form control is invalid
        expect(component.registerForm.controls['email'].valid).toBeFalse();
      }
    });
  });

  describe('on form submit', () => {
    it('givenInputs_whenValuesValuesAreFilledInHtml_thenFormContainsTheValues', () => {
      // Set values in the HTML inputs
      const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
      const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement;
      const usernameInput = fixture.debugElement.query(By.css('input[formControlName="username"]')).nativeElement;

      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = 'testpassword';
      passwordInput.dispatchEvent(new Event('input'));
      usernameInput.value = 'testUser';
      usernameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Check that the loginForm controls have the set values
      expect(component.registerForm.get('email')?.value).toEqual('test@example.com');
      expect(component.registerForm.get('password')?.value).toEqual('testpassword');
      expect(component.registerForm.get('username')?.value).toEqual('testUser');

      // Now, do it in reverse: Set the values via the form controls and check the HTML input values
      component.registerForm.controls['email'].setValue('newtest@example.com');
      component.registerForm.controls['password'].setValue('newtestpassword');
      component.registerForm.controls['username'].setValue('testUser');
      fixture.detectChanges();

      expect(emailInput.value).toEqual('newtest@example.com');
      expect(passwordInput.value).toEqual('newtestpassword');
      expect(usernameInput.value).toEqual('testUser');
    });

    it('givenSetToLoading_whenLoading_thenShowLoadingIndicator', () => {
      component.loading = true;
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('givenSetToLoadingFalse_whenLoadingFinished_thenLoadingIndicatorIsRemoved', () => {
      component.loading = true;  // Initially set to true
      fixture.detectChanges();   // Apply changes

      let spinner = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinner).not.toBeNull();  // Check that it's initially there

      component.loading = false; // Now set to false
      fixture.detectChanges();   // Apply changes

      spinner = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinner).toBeNull();  // It should be gone
    });

    it('givenExistingEmail_whenServerReturnsError_thenDisplayError', async () => {
      const email = 'test@example.com'
      component.registerForm.controls['email'].setValue(email);
      component.registerForm.controls['password'].setValue('password');
      component.registerForm.controls['username'].setValue('username');

      const errorResponse = { error: { message: `Email already registered: ${email}`}}
      authServiceMock.register.and.returnValue(throwError(() => errorResponse));

      component.onSubmit();
      await fixture.whenStable();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
      expect(errorMessage.errorMessage).toContain(`Email already registered: ${email}`);
    });

    it('givenExistingUsername_whenServerReturnsError_thenDisplayError', async () => {
      const username = 'Tester'
      component.registerForm.controls['username'].setValue(username);
      component.registerForm.controls['password'].setValue('password');
      component.registerForm.controls['username'].setValue('username');

      const errorResponse = { error: { message: `Username already registered: ${username}`}}
      authServiceMock.register.and.returnValue(throwError(() => errorResponse));

      component.onSubmit();
      await fixture.whenStable();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
      expect(errorMessage.errorMessage).toContain(`Username already registered: ${username}`);
    });

    it('givenOtherServerIssue_whenServerReturnsError_thenDisplayError', async () => {
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('password');
      component.registerForm.controls['username'].setValue('username');

      const errorResponse = { error: { message: 'Any other message'}}
      authServiceMock.register.and.returnValue(throwError(() => errorResponse));

      component.onSubmit();
      await fixture.whenStable();
      fixture.detectChanges();

      const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
      expect(errorMessage.errorMessage).toContain('An error occurred during registeration. Please try again.');
    });
  });

  describe('Nomrla state', () => {
    it('should enable the submit button if the form is valid', () => {
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('password123');
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.disabled).toBeFalse();
    });

    it('should have an invalid form on init', () => {
      expect(component.registerForm.valid).toBeFalse();
    });

    it('should disable the submit button if the form is invalid', () => {
      component.registerForm.controls['email'].setValue('');
      component.registerForm.controls['password'].setValue('');
      fixture.detectChanges();
      const button = fixture.debugElement.nativeElement.querySelector('button');
      expect(button.disabled).toBeTrue();
    });
  });
});