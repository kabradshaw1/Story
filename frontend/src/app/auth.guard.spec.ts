import { TestBed } from "@angular/core/testing";
import { AuthGuard, PermissionService } from './auth.guard';
import { Store } from "@ngrx/store";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import AppState from "./store/state/app.state";

describe('PermissionsService', () => {
  let service: PermissionService;
  let mockStore: jasmine.SpyObj<Store<AppState>>;
  let mockRouter: jasmine.SpyObj<Router>;
  const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
  const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;

  beforeEach(() => {

    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      providers: [
        PermissionService,
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter }
      ]
    });

    const mockToken = 'VALID_MOCK_TOKEN';  // Placeholder since we're mocking decodeToken
    mockStore.select.and.returnValue(of(mockToken));

    service = TestBed.inject(PermissionService);

    // Mock jwtDecode behavior
    //@ts-ignore because I don't need to define the other properties of a decoded token in this test
    spyOn(service, 'decodeToken').and.returnValue({ exp: Math.floor(Date.now() / 1000) + 3600 }); // Spy on the new decodeToken method
  });

  afterEach(() => {
    mockRouter.navigateByUrl.calls.reset();
  });


  it('givenTokenIsValid_whenCallToCanActivate_thenAllowNavigation', () => {
    const mockToken = 'VALID_MOCK_TOKEN';  // you can use a placeholder here since we're mocking decodeToken
    mockStore.select.and.returnValue(of(mockToken));

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(true);
    });
  });

  // it('givenNoToken_whenCallToCanActivate_thenDenyNavigation', (done) => {
  //     mockStore.select.and.returnValue(of(null)); // Simulate no token

  //     const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
  //     const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;

  //     service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(() => {
  //       expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  //       done();
  //     });
  // });

  it('givenExpiredToken_whenCallToCanActivate_thenDenyNavigation', () => {
    // Decoding will show that the token is expired
    (service.decodeToken as jasmine.Spy).and.returnValue({ exp: Math.floor(Date.now() / 1000) - 3600 });

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(false);
    });
  });

  // it('givenUnauthorizedAccess_whenCallToCanActivate_thenRedirectToLoginPage', () => {
  //   mockStore.select.and.returnValue(of(null)); // Simulate no token

  //   const mockActivatedRouteSndapshot: ActivatedRouteSnapshot = {} as any;
  //   const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;

  //   service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(() => {
  //     expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  //   });
  // });
});

// describe('AuthGuard', () => {
//   let guard: typeof AuthGuard;
//   let mockPermissionService: jasmine.SpyObj<PermissionService>;

//   const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
//   const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;
//   beforeEach(() => {
//     mockPermissionService = jasmine.createSpyObj('PermissionService', ['canActivate']);
//     guard = AuthGuard;

//     TestBed.configureTestingModule({
//       providers: [
//         { provide: PermissionService, useValue: mockPermissionService }
//       ]
//     });
//   });

//   it('should call PermissionService canActivate method', () => {
//     mockPermissionService.canActivate.and.returnValue(of(true));
//     guard(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
//       expect(canActivate).toBe(true);
//       expect(mockPermissionService.canActivate).toHaveBeenCalled();
//     });
//   });
// })