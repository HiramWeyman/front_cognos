import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcasoComponent } from './formcaso.component';

describe('FormcasoComponent', () => {
  let component: FormcasoComponent;
  let fixture: ComponentFixture<FormcasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcasoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormcasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
