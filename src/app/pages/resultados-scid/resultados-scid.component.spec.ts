import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosScidComponent } from './resultados-scid.component';

describe('ResultadosScidComponent', () => {
  let component: ResultadosScidComponent;
  let fixture: ComponentFixture<ResultadosScidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosScidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosScidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
