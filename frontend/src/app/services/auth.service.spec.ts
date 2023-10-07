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
    it('givenValidCredentials_whenLogin_thenDispatchLoginSuccess', () => {
      const mockResponse = { accessToken: 'mock-access-token' };
      const loginDetails = { email: 'test@example.com', password: 'password' };

      service.login(loginDetails.email, loginDetails.password);

      const req = httpMock.expectOne(`http://localhost:8080/api/login/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: '[Auth] Login Success',
        payload: mockResponse.accessToken
      });
    });
  });
});
