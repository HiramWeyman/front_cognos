import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineavidaComponent } from './lineavida.component';

describe('LineavidaComponent', () => {
  let component: LineavidaComponent;
  let fixture: ComponentFixture<LineavidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineavidaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineavidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
