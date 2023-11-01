import { Injectable, inject } from "@angular/core";
import { CanActivateFn, CanActivateChildFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { selectAuthToken } from "./store/selectors/auth.selector";
import AppState from 'src/app/store/state/app.state';
import { Store } from "@ngrx/store";
import { jwtDecode }from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {}

  user$ = this.store.select(selectAuthToken);


  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true; // In case of any error, treat token as expired.
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.user$.
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state)
}

