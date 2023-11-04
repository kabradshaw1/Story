import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthToken } from 'src/app/store/selectors/auth.selector';
import AppState from 'src/app/store/state/app.state';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  token$: Observable<string | null>

  constructor(
    private store: Store<AppState>
  ) {
    this.token$ = this.store.select(selectAuthToken);
  }

}
