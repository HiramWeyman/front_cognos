import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviopruebasComponent } from './enviopruebas.component';

describe('EnviopruebasComponent', () => {
  let component: EnviopruebasComponent;
  let fixture: ComponentFixture<EnviopruebasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnviopruebasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviopruebasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
