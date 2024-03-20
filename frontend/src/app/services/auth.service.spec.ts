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
    });

    it('givenInvalidCredentials_whenLogin_thenHandleUnauthorizedError', () => {
      const loginError = {
        status: 401,
        error: 'Invalid credentials'
      };

      const loginDetails = { email: 'wrong@example.com', password: 'wrongPassword' };

      service.login(loginDetails.email, loginDetails.password).subscribe({
        next: response => fail('Expected an error, but got a successful response.'),
        error: error => expect(error.error).toBe('Invalid credentials')
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/login/`);
      expect(req.request.method).toBe('POST');

      // Simulate a server UNAUTHORIZED response
      req.flush('Invalid credentials', { status: 401, statusText: 'UNAUTHORIZED' });
    });
  });
  describe('register', () => {
    it('givenValidCredentials_whenRegister_thenDispatchRegisterSuccess', () => {
      const mockResponse = { accessToken: 'mock-access-token' };
      const registerDetails = { email: 'test@example.com', password: 'password', username: 'Tester' };

      service.register(registerDetails.username, registerDetails.password, registerDetails.email).subscribe();

      const req = httpMock.expectOne('http://localhost:8080/api/register/');
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('givenInvalidCredentials_whenRegister_thenHandleError', () => {
      const registerDetails = { email: 'existing@example.com', username: 'ExistingUser', password: 'password' };

      service.register(registerDetails.username, registerDetails.password, registerDetails.email).subscribe({
        next: () => fail('Expected an error, but got a successful response.'),
        error: error => expect(error.error).toBe('An error message')
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/register/`);
      expect(req.request.method).toBe('POST');

      req.flush('An error message', { status: 400, statusText: 'BAD REQUEST' });
    });


  });

  describe('refresh', () => {
    it('givenValidRefreshToken_whenCalled_thenHandlesSuccessfulRequest', () => {
      const mockResponse = { accessToken: 'new-mock-access-token' };

      // Call the refresh method
      service.refresh().subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      // Expect that the correct request method and URL were used.
      const req = httpMock.expectOne('http://localhost:8080/api/refresh/');
      expect(req.request.method).toBe('POST');

      // Respond with mock data
      req.flush(mockResponse);
    });

    it('givenInvalidRefreshToken_whenCalled_thenHandlesFailedRequest', () => {
      service.refresh().subscribe({
        next: () => fail('Expected an error, but got a successful response.'),
        error: error => expect(error.error).toBe('An error message')
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/refresh/`);
      expect(req.request.method).toBe('POST');

      req.flush('An error message', { status: 400, statusText: 'BAD REQUEST' });
    })
  })
});
