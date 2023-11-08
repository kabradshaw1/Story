import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { selectAuthToken } from 'src/app/store/selectors/auth.selector';
import AppState from 'src/app/store/state/app.state';
import { DecodedJwt } from 'src/app/types';
import { JwtService } from 'src/app/services/jwt.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  token$: Observable<string | null>
  username$: Observable<string>

  constructor(
    private store: Store<AppState>,
    private jwtService: JwtService
  ) {
    this.token$ = this.store.select(selectAuthToken);
    this.username$ = this.token$.pipe(
      map(token => token ? this.jwtService.decodeToken<DecodedJwt>(token).username : 'Welcome')
    );
  };

}
