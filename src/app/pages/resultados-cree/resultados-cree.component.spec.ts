import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosCreeComponent } from './resultados-cree.component';

describe('ResultadosCreeComponent', () => {
  let component: ResultadosCreeComponent;
  let fixture: ComponentFixture<ResultadosCreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadosCreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosCreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
