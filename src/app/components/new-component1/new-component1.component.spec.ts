import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComponent1Component } from './new-component1.component';

describe('NewComponent1Component', () => {
  let component: NewComponent1Component;
  let fixture: ComponentFixture<NewComponent1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewComponent1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
