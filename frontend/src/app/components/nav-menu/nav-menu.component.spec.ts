import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import AppState from 'src/app/store/state/app.state';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [RouterTestingModule],

    });
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('html', () => {
    it('give_whenComponentLoaded_thenDisplayButtons', () => {
      const fixture = TestBed.createComponent(NavMenuComponent);
    })
  })
});
