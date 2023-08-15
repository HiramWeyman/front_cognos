import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludfisicaComponent } from './saludfisica.component';

describe('SaludfisicaComponent', () => {
  let component: SaludfisicaComponent;
  let fixture: ComponentFixture<SaludfisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludfisicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaludfisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
