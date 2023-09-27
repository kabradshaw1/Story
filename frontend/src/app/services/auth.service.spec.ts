import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { StoreModule } from '@ngrx/store';
import { authReducer } from '../store/reducers';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

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
    it('should return an access token and a refresh token and store the access token', () => {
      const mockResponse = {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token'
      };

      service.login('username', 'password').subscribe((response: { accessToken: string; refreshToken: string; }) => {
        expect(response.accessToken).toEqual('mock-access-token');
        expect(response.refreshToken).toEqual('mock-refresh-token');

        // Validate if token is stored in local storage or in ngrx store based on your implementation.
        expect(localStorage.getItem('accessToken')).toEqual('mock-access-token');
        // Add additional expectations based on how you handle the refresh token.
      });

      const req = httpMock.expectOne(`YOUR_API_ENDPOINT`); // Replace with your actual endpoint.
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });
});
