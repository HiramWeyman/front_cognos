import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBdidpComponent } from './resultados-bdidp.component';

describe('ResultadosBdidpComponent', () => {
  let component: ResultadosBdidpComponent;
  let fixture: ComponentFixture<ResultadosBdidpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosBdidpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosBdidpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
