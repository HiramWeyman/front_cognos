import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerinformeComponent } from './verinforme.component';

describe('VerinformeComponent', () => {
  let component: VerinformeComponent;
  let fixture: ComponentFixture<VerinformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerinformeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerinformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
