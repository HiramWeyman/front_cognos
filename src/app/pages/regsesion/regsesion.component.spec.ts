import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsesionComponent } from './regsesion.component';

describe('RegsesionComponent', () => {
  let component: RegsesionComponent;
  let fixture: ComponentFixture<RegsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegsesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
