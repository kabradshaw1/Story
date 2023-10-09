import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: jasmine.SpyObj<Store>;
  let mockDispatch: jasmine.Spy;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Store, useValue: storeSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store as any);
    mockDispatch = store.dispatch as jasmine.Spy;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('givenCredentials_whenLogin_thenDispatchLoginSuccess', () => {
      const mockResponse = { accessToken: 'mock-access-token' };
      const loginDetails = { email: 'test@example.com', password: 'password' };

      service.login(loginDetails.email, loginDetails.password).subscribe();

      const req = httpMock.expectOne(`http://localhost:8080/api/login/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: '[Auth] Login Success',
        payload: mockResponse.accessToken
      });
    });

    it('givenInvalidCredentials_whenLogin_thenHandleUnauthorizedError', () => {
      const loginError = {
        status: 401,
        error: 'Invalid credentials'
      };

      const loginDetails = { email: 'wrong@example.com', password: 'wrongPassword' };

      service.login(loginDetails.email, loginDetails.password).subscribe(
        response => fail('Expected an error, but got a successful response.'),
        error => expect(error.error).toBe('Invalid credentials')
      );

      const req = httpMock.expectOne(`http://localhost:8080/api/login/`);
      expect(req.request.method).toBe('POST');

      // Simulate a server UNAUTHORIZED response
      req.flush('Invalid credentials', { status: 401, statusText: 'UNAUTHORIZED' });
    });
    it('givenMissingCredentials_whenLogin_thenReturnsError', () => {

    })
  });
});
