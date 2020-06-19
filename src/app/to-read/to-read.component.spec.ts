/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToReadComponent } from './to-read.component';

describe('ToReadComponent', () => {
  let component: ToReadComponent;
  let fixture: ComponentFixture<ToReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
