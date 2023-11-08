import { TestBed } from "@angular/core/testing";
import { AuthGuard, PermissionService } from './auth.guard';
import { Store, MemoizedSelector } from "@ngrx/store";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import AppState from "./store/state/app.state";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { JwtService } from "./services/jwt.service";
import { DecodedJwt } from 'src/app/types';
import { selectAuthToken } from "./store/selectors/auth.selector";
import { of } from "rxjs";

describe('PermissionsService', () => {
  let service: PermissionService;
  let store: MockStore<AppState>
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSelectAuthToken: MemoizedSelector<AppState, string | null>
  const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
  const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;
  const expectedDecodedToken: DecodedJwt = {
    username: 'testUser',
    id: 1,
    isAdmin: false,
    exp: 123456789,
    iat: 123456789,
    iss: 'TestIssuer'
  };

  beforeEach(() => {

    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        PermissionService,
        provideMockStore(),
        { provide: Router, useValue: mockRouter },
        { provide: JwtService, useValue: { decodeToken: () => expectedDecodedToken } }
      ]
    });

    const mockToken = 'VALID_MOCK_TOKEN';  // Placeholder since we're mocking decodeToken

    service = TestBed.inject(PermissionService);
    store = TestBed.inject(Store) as MockStore<AppState>;
    mockSelectAuthToken = store.overrideSelector(selectAuthToken, null);
  });

  afterEach(() => {
    mockRouter.navigateByUrl.calls.reset();
  });


  it('givenTokenIsValid_whenCallToCanActivate_thenAllowNavigation', () => {
    const mockToken = 'VALID_MOCK_TOKEN';  // Placeholder since we're mocking decodeToken
    mockSelectAuthToken.setResult(mockToken);

    // This assumes that the JwtService is returning an unexpired token for the given VALID_MOCK_TOKEN
    spyOn(service['jwtService'], 'decodeToken').and.returnValue({ ...expectedDecodedToken, exp: Math.floor(Date.now() / 1000) + 3600 }); // 1 hour ahead

    // You should refresh the store state after setting a new result for a selector
    store.refreshState();

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(true); // The assertion should now pass
    });
  });


  it('givenExpiredToken_whenCallToCanActivate_thenDenyNavigation', () => {
    const expiredToken = 'EXPIRED_MOCK_TOKEN';
    mockSelectAuthToken.setResult(expiredToken);

    // Mock the JwtService to return an expired token
    spyOn(service['jwtService'], 'decodeToken').and.returnValue({ ...expectedDecodedToken, exp: Math.floor(Date.now() / 1000) - 3600 }); // 1 hour in the past

    // You should refresh the store state after setting a new result for a selector
    store.refreshState();

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(false);
    });
  });


  it('givenExpiredToken_whenCallToCanActivate_thenDenyNavigation', () => {
    const expiredToken = 'EXPIRED_MOCK_TOKEN';
    mockSelectAuthToken.setResult(expiredToken);

    // Mock the JwtService to return an expired token
    spyOn(service['jwtService'], 'decodeToken').and.returnValue({ ...expectedDecodedToken, exp: Math.floor(Date.now() / 1000) - 3600 }); // 1 hour in the past

    // You should refresh the store state after setting a new result for a selector
    store.refreshState();

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(false);
    });
  });


  it('givenUnauthorizedAccess_whenCallToCanActivate_thenRedirectToLoginPage', () => {
    const unauthorizedToken = 'UNAUTHORIZED_MOCK_TOKEN';
    mockSelectAuthToken.setResult(unauthorizedToken);

    spyOn(service['jwtService'], 'decodeToken').and.returnValue({ ...expectedDecodedToken, isAdmin: false }); // Adjust as necessary for permissions

    // You should refresh the store state after setting a new result for a selector
    store.refreshState();

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(false);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });

});

// describe('AuthGuard', () => {
//   let mockPermissionService: jasmine.SpyObj<PermissionService>;
//   let guard: AuthGuard;
//   const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
//   const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;

//   beforeEach(() => {
//     mockPermissionService = jasmine.createSpyObj('PermissionService', ['canActivate']);

//     TestBed.configureTestingModule({
//       // Provide both the AuthGuard and the mock PermissionService
//       providers: [
//         AuthGuard,
//         { provide: PermissionService, useValue: mockPermissionService }
//       ]
//     });

//     // Inject both the AuthGuard and the mock PermissionService
//     guard = TestBed.inject(AuthGuard);
//   });

//   it('should call PermissionService canActivate method', () => {
//     mockPermissionService.canActivate.and.returnValue(of(true));

//     guard.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe((canActivate: boolean) => {
//       expect(canActivate).toBe(true);
//       expect(mockPermissionService.canActivate).toHaveBeenCalledWith(mockActivatedRouteSnapshot, mockRouterStateSnapshot);
//     });
//   });
// });
