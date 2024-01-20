import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosSCLComponent } from './resultados-scl.component';

describe('ResultadosSCLComponent', () => {
  let component: ResultadosSCLComponent;
  let fixture: ComponentFixture<ResultadosSCLComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosSCLComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosSCLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
