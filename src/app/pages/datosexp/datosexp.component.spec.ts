import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosexpComponent } from './datosexp.component';

describe('DatosexpComponent', () => {
  let component: DatosexpComponent;
  let fixture: ComponentFixture<DatosexpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosexpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosexpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
