import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import AppState from 'src/app/store/state/app.state';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockStore: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {

    mockStore = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Store, useValue: mockStore }
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
