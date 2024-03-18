import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
      imports: [RouterTestingModule.withRoutes([])], // You might want to define routes for testing
    })
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('html', () => {
    // Use fakeAsync to wrap tests involving navigation or async operations
    it('give_whenButtonClicked_thenCreateComponent', fakeAsync(() => {
      // spyOn(component.dynamicOutlet, 'createComponent');
      // const button = fixture.debugElement.nativeElement.querySelector('#character');
    }));

    it('given_when_then', fakeAsync(() => {
    
    }));
  });
});
