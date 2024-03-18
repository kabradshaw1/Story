import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { SceneComponent } from './scene/scene.component';
import { TimelineComponent } from './timeline/timeline.component';
import { OrganizationComponent } from './organization/organization.component';
import { RegionComponent } from './region/region.component';
import { PopulationComponent } from './population/population.component';
import { LocationComponent } from './location/location.component';
import { ConflictComponent } from './conflict/conflict.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  @ViewChild('dynamicOutlet', { read: ViewContainerRef }) dynamicOutlet: ViewContainerRef | undefined;
  
  characterComponent = CharacterComponent;
  sceneComponent = SceneComponent;
  timelineComponent = TimelineComponent;
  organizationComponent = OrganizationComponent;
  regionComponent = RegionComponent;
  populationComponent = PopulationComponent;
  locationComponent = LocationComponent;
  conflictComponent = ConflictComponent;
  
  constructor() {}

  loadComponent(component: any) {
    this.dynamicOutlet?.clear();
    this.dynamicOutlet?.createComponent(component);
  }
}
