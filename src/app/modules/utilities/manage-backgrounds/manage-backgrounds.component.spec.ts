/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageBackgroundsComponent } from './manage-backgrounds.component';

describe('ManageBackgroundsComponent', () => {
  let component: ManageBackgroundsComponent;
  let fixture: ComponentFixture<ManageBackgroundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBackgroundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBackgroundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
