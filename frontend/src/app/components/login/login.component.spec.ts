import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as AuthActions from '../../store/actions/auth.actions';
import { selectAuthError } from 'src/app/store/selectors/auth.selector';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  const initialAuthState = { error: null }

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [provideMockStore({ initialState: initialAuthState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch').and.callThrough();


    store.overrideSelector(selectAuthError, null)
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.loading = false; // Reset the loading state
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
      expect(emailError.textContent).toContain('Email is required');
    });

    it('givenInvalidEmail_whenEmailIsEntered_thenReturnerror', () => {
      component.loginForm.controls['email'].setValue('plainaddress');
      component.loginForm.controls['email'].markAsTouched();

      fixture.detectChanges();
      const emailError = fixture.debugElement.nativeElement.querySelector('input[formControlName="email"] + .alert');
      expect(emailError.textContent).toContain('This email is not a valid format.');
    });

    it('givenNoPassword_whenBlankPasswordIsEntenered_thenReturnerror', () => {
      component.loginForm.controls['password'].setValue('');
      component.loginForm.controls['password'].markAsTouched();

      fixture.detectChanges();
      const passwordError = fixture.debugElement.query(By.css('input[formControlName="password"] + .alert')).nativeElement;
      expect(passwordError.textContent).toContain('Password is required');
    });

    it('should display an invalid password error message when password is less then 8 characters', () => {
      component.loginForm.controls['password'].setValue('passwor');
      component.loginForm.controls['password'].markAsTouched();
      fixture.detectChanges();

      const passwordError = fixture.debugElement.query(By.css('input[formControlName="password"] + .alert')).nativeElement;
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
    describe('error messages', () => {

      it('givenError_whenStateChanges_thenDisplayInvalidCredentials', () => {
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


    it('should bind input values to the loginForm controls', () => {
      // Set values in the HTML inputs
      const emailInput = fixture.debugElement.query(By.css('input[formControlName="email"]')).nativeElement;
      const passwordInput = fixture.debugElement.query(By.css('input[formControlName="password"]')).nativeElement;

      emailInput.value = 'test@example.com';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.value = 'testpassword';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      // Check that the loginForm controls have the set values
      expect(component.loginForm.get('email')?.value).toEqual('test@example.com');
      expect(component.loginForm.get('password')?.value).toEqual('testpassword');

      // Now, do it in reverse: Set the values via the form controls and check the HTML input values
      component.loginForm.controls['email'].setValue('newtest@example.com');
      component.loginForm.controls['password'].setValue('newtestpassword');
      fixture.detectChanges();

      expect(emailInput.value).toEqual('newtest@example.com');
      expect(passwordInput.value).toEqual('newtestpassword');
    });

    it('should show a loading indicator when logging in', () => {
      component.loading = true;
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should hide loading indicator when loading is set to false', () => {
      component.loading = true;  // Initially set to true
      fixture.detectChanges();   // Apply changes

      let spinner = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinner).not.toBeNull();  // Check that it's initially there

      component.loading = false; // Now set to false
      fixture.detectChanges();   // Apply changes

      spinner = fixture.debugElement.query(By.css('.loading-spinner'));
      expect(spinner).toBeNull();  // It should be gone
    });

    it('givenValidCredentials_whenOnSubmitCalled_thenDispatchLogin', () => {
      component.loginForm.controls['email'].setValue('test@example.com');
      component.loginForm.controls['password'].setValue('password');

      const action = AuthActions.login({ email: 'test@example.com', password: 'password' });

      component.onSubmit();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });
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