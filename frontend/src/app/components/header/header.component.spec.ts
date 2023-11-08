import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { MemoizedSelector, Store } from '@ngrx/store';
import AppState from 'src/app/store/state/app.state';
import { RouterTestingModule } from '@angular/router/testing';
import { selectAuthToken } from 'src/app/store/selectors/auth.selector';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DecodedJwt } from 'src/app/types';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: MockStore<AppState>;
  let mockSelectAuthToken: MemoizedSelector<AppState, string | null>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore()
      ]
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore<AppState>;
    mockSelectAuthToken = store.overrideSelector(selectAuthToken, null);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('givenAccessTokenIsPresent_whenPageLoads_thenDisplayUsername', () => {
    const mockToken = 'VALID_MOCK_TOKEN';
    const expectedDecodedToken: DecodedJwt = {
      username: 'testUser',
      id: 1,
      isAdmin: false,
      exp: 123456789,
      iat: 123456789,
      iss: 'TestIssuer'
    };

    // Override the selector to return the mock token
    mockSelectAuthToken.setResult(mockToken);

    // Decode the token and set the result
    spyOn(component, 'decodeToken').and.returnValue(expectedDecodedToken);

    // Refresh the state to emit the new mock token
    store.refreshState();
    fixture.detectChanges();

    const dropdownText = fixture.debugElement.query(By.css('#navbarDropdown')).nativeElement.textContent;
    expect(dropdownText).toContain(expectedDecodedToken.username);
  });
});
