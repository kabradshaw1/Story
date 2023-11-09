import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAuthError } from 'src/app/store/selectors/auth.selector';
import * as AuthActions from '../../store/actions/auth.actions';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  const initialAuthState = { error: null }

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [provideMockStore({ initialState: initialAuthState })]
    }).compileComponents();

    store = TestBed.inject(MockStore)
    spyOn(store, 'dispatch').and.callThrough();

    store.overrideSelector(selectAuthError, null)
    fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.loading = false; // Reset the loading state
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
    it('givenNotMatchingPasswords_whenFormIsChecked_thenDisableSubmit', () => {
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('password123');
      component.registerForm.controls['confirmPassword'].setValue('different');
      fixture.detectChanges();

      const submitButton = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.disabled).toBeTrue();
    });
  });

  describe('on form submit', () => {

    it('givenConfirmPasswordDoesNotMatch_whenSubmittingForm_thenDisplayError', () => {
      component.registerForm.controls['password'].setValue('password123');
      component.registerForm.controls['confirmPassword'].setValue('different');
      fixture.detectChanges();

      const confirmPasswordError = fixture.debugElement.query(By.css('.confirm-password-error')).nativeElement;
      expect(confirmPasswordError).toBeTruthy();
      expect(confirmPasswordError.textContent).toContain('Passwords must match');
    });


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

    describe('error messages', () => {

      it('givenError_whenStateChanges_thenDisplayErrorMessage', () => {
        store.overrideSelector(selectAuthError, 'Invalid credentials.');  // Mock the selector value
        store.refreshState();
        fixture.detectChanges();

        const error = fixture.debugElement.nativeElement.querySelector('.error-message');
        expect(error.textContent).toContain('Invalid credentials.');
      });

      it('givenNoError_whenStateChange_thenDoNotDisplayError', () => {
        store.setState({ error: null });  // Set the state
        fixture.detectChanges();  // Apply changes

        const error = fixture.debugElement.nativeElement.querySelector('.error-message');
        expect(error).toBeNull();
      });
    });



  });

  describe('Normal state', () => {
    it('should enable the submit button if the form is valid', () => {
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('password123');
      component.registerForm.controls['username'].setValue('Tester')
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
