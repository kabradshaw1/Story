import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { LoginComponent } from 'src/app/components/login/login.component';

describe('LoginComponent', () => {
  let storeMock;

  beforeEach(async () => {
    storeMock = {
      select: jasmine.createSpy('select'),
      dispatch: jasmine.createSpy('dispatch')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Store, useValue: storeMock }
      ]
    }).compileComponents();
  });

  // ... other tests ...
});
