import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictComponent } from './conflict.component';

describe('ConflictComponent', () => {
  let component: ConflictComponent;
  let fixture: ComponentFixture<ConflictComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConflictComponent]
    });
    fixture = TestBed.createComponent(ConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
