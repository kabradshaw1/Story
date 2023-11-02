import { Injectable, inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { selectAuthToken } from "./store/selectors/auth.selector";
import AppState from 'src/app/store/state/app.state';
import { Store } from "@ngrx/store";
import { jwtDecode } from 'jwt-decode';
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  user$: Observable<string | null>;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    this.user$ = this.store.select(selectAuthToken);
  }

  decodeToken(token: string): any {
    return jwtDecode(token); // Simply wrap the jwtDecode call
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: any = this.decodeToken(token); // Use the new method here
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true; // In case of any error, treat token as expired.
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.user$.pipe(
      map(token => {
        if (token && !this.isTokenExpired(token)) {
          return true;
        } else {
          this.router.navigateByUrl("/login");
          //probably want to add updating state to an error message here
          return false
        }
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(PermissionService).canActivate(next, state);
}

