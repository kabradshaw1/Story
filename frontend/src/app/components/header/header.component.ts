import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // isLoggedIn: boolean;
  // subscription: Subscription;

  // constructor(private store: Store, private router: Router) {
  //   this.subscription = this.store.select('auth').subscribe(authState => {
  //     this.isLoggedIn = authState
  //   })
  // }

}
