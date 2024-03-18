import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [RouterTestingModule.withRoutes([])], // You might want to define routes for testing
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('html', () => {
    // Use fakeAsync to wrap tests involving navigation or async operations
    it('give_whenComponentLoaded_thenDisplayButtons', fakeAsync(() => {
      const spy = spyOn(router, 'navigate');
      const characterLink = fixture.debugElement.nativeElement.querySelector('#nav-characters');
      characterLink.click();
      tick(); // Simulate passage of time if necessary
      expect(spy).toHaveBeenCalledWith(['/characters']);
    }));

    it('given_when_then', fakeAsync(() => {
      const characterLink = fixture.debugElement.query(By.css('#nav-characters')).nativeElement;
      expect(characterLink).toBeTruthy();
      // Optionally, if you want to test that the routerLink is properly bound:
      const routerLinkInstance = fixture.debugElement.query(By.directive(RouterLink)).injector.get(RouterLink);
      tick(); // Advance virtual time if there's an async operation
      expect(routerLinkInstance.urlTree).toEqual(router.createUrlTree(['/characters']));
    }));
  });
});
