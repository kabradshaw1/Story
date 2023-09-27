import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { authReducer } from '../store/reducers/auth.reducers';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let store: MockStore;
  const initialState = { auth: { token: null } };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({auth: authReducer })
      ],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should perform login and store the access token in the state', () => {
      const mockResponse = { accessToken: 'mock-access-token' };
      const loginDetails = { email: 'test@example.com', password: 'password' };

      service.login(loginDetails.email, loginDetails.password).subscribe((response: { accessToken: string }) => {
        expect(response.accessToken).toEqual('mock-access-token');

        expect(localStorage.getItem('accessToken')).toEqual('mock-access-token');
      });

      const req = httpMock.expectOne(`http://localhost:8080/api/login/`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
