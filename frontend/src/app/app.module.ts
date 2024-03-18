import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers/auth.reducers';
import { ProtectedComponent } from './components/protected/protected.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { CharacterComponent } from './components/nav-menu/character/character.component';
import { SceneComponent } from './components/nav-menu/scene/scene.component';
import { TimelineComponent } from './components/nav-menu/timeline/timeline.component';
import { PopulationComponent } from './components/nav-menu/population/population.component';
import { ConflictComponent } from './components/nav-menu/conflict/conflict.component';
import { OrganizationComponent } from './components/nav-menu/organization/organization.component';
import { LocationComponent } from './components/nav-menu/location/location.component';
import { RegionComponent } from './components/nav-menu/region/region.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProtectedComponent,
    NavMenuComponent,
    CharacterComponent,
    SceneComponent,
    TimelineComponent,
    PopulationComponent,
    ConflictComponent,
    OrganizationComponent,
    LocationComponent,
    RegionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
