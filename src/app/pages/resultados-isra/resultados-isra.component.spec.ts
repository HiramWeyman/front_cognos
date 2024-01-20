import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosIsraComponent } from './resultados-isra.component';

describe('ResultadosIsraComponent', () => {
  let component: ResultadosIsraComponent;
  let fixture: ComponentFixture<ResultadosIsraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosIsraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosIsraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
