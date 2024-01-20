import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepsesionComponent } from './repsesion.component';

describe('RepsesionComponent', () => {
  let component: RepsesionComponent;
  let fixture: ComponentFixture<RepsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepsesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
