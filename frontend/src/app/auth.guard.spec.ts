import { TestBed } from "@angular/core/testing";
import { AuthGuard, PermissionService } from './auth.guard';
import { Store } from "@ngrx/store";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import AppState from "./store/state/app.state";
import { selectAuthToken } from "./store/selectors/auth.selector";

describe('PermissionsService', () => {
  let service: PermissionService;
  let mockStore: jasmine.SpyObj<Store<AppState>>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {

    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockRouter = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        PermissionService,
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter }
      ]
    });

    service = TestBed.inject(PermissionService);
  });

  it('givenTokenIsValid_whenCallToCanActivate_thenAllowNavigation', () => {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0Ijo2MzA3MjAwMDB9.Gndt2aCi_IklJ-F5WugWm2_9e4Kit5nXBDxHDG3FatY';

    // Mock the store's select method to return the mock token only when the specific selector is used
    mockStore.select.and.callFake((selector: any) => {
      if (selector === selectAuthToken) {
        return of(mockToken);
      }
      throw new Error("Unexpected selector");
    });

    const mockActivatedRouteSnapshot: ActivatedRouteSnapshot = {} as any;
    const mockRouterStateSnapshot: RouterStateSnapshot = {} as any;

    service.canActivate(mockActivatedRouteSnapshot, mockRouterStateSnapshot).subscribe(canActivate => {
      expect(canActivate).toBe(true);
    });
  });


})