import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CharacterComponent } from './character/character.component';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  @ViewChild('dynamicOutlet', { read: ViewContainerRef }) dynamicOutlet: ViewContainerRef | undefined;
  
  characterComponent = CharacterComponent
  
  constructor() {}

  loadComponent(component: any) {
    this.dynamicOutlet?.clear();
    this.dynamicOutlet?.createComponent(component);
  }
}
