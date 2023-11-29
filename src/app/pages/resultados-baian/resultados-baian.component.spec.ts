import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBaianComponent } from './resultados-baian.component';

describe('ResultadosBaianComponent', () => {
  let component: ResultadosBaianComponent;
  let fixture: ComponentFixture<ResultadosBaianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosBaianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosBaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
