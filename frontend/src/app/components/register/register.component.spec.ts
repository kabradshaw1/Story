import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

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

    it('given_when_then', () => {
      component.registerForm.controls['email'].setValue('test@example.com');
      component.registerForm.controls['password'].setValue('testPassword');
      component.registerForm.controls['username'].setValue('testUser');

      expect(component.registerForm.controls['email'].valid).toBeTrue();
      expect(component.registerForm.controls['password'].valid).toBeTrue();
      expect(component.registerForm.controls['username'].valid).toBeTrue();
    });
  });

});
