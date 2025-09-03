import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescalumnoComponent } from './descalumno.component';

describe('DescalumnoComponent', () => {
  let component: DescalumnoComponent;
  let fixture: ComponentFixture<DescalumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescalumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescalumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
