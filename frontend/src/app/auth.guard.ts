import { Injectable, inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { selectAuthToken } from "./store/selectors/auth.selector";
import AppState from 'src/app/store/state/app.state';
import { Store } from "@ngrx/store";
import { Observable, map } from "rxjs";
import { DecodedJwt } from "./types";
import { JwtService } from "./services/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  token$: Observable<string | null>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private jwtService: JwtService
  ) {
    this.token$ = this.store.select(selectAuthToken);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded: DecodedJwt = this.jwtService.decodeToken(token); // Use the new method here
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return true; // In case of any error, treat token as expired.
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.token$.pipe(
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

