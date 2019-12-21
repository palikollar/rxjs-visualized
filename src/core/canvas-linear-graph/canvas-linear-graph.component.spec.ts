import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasLinearGraphComponent } from './canvas-linear-graph.component';

describe('CanvasLinearGraphComponent', () => {
  let component: CanvasLinearGraphComponent;
  let fixture: ComponentFixture<CanvasLinearGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasLinearGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasLinearGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
