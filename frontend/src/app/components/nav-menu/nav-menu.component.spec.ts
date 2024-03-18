import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavMenuComponent } from './nav-menu.component';
import { CharacterComponent } from './character/character.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavMenuComponent],
    })

    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes to render the template
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('give_whenButtonClicked_thenCreateComponent', () => {
    // Assuming dynamicOutlet is initialized and not undefined at this point
    const spy = spyOn(component.dynamicOutlet!, 'createComponent').and.callThrough();
    const button = fixture.debugElement.nativeElement.querySelector('.btn');
    button.click();
    expect(spy.calls.any()).toEqual(true);
  });

  it('givenComponentLoaded_whenClearComponent_ComponentCleared', () => {
    spyOn(component.dynamicOutlet!, 'clear');
    component.loadComponent(CharacterComponent);
    expect(component.dynamicOutlet?.clear).toHaveBeenCalled();
  })
});
