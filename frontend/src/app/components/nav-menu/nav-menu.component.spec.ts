import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;
  let router: Router;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [RouterTestingModule],

    }).compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('html', () => {
   // Updated to match the button's routerLink value
    it('give_whenComponentLoaded_thenDisplayButtons', () => {
      const navigateSpy = spyOn(router, 'navigate');
      const button = fixture.debugElement.nativeElement.querySelector('#nav-characters');
      button.click();
      expect(navigateSpy).toHaveBeenCalledWith(['/characters']);
    });
  })
});
