import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisraComponent } from './risra.component';

describe('RisraComponent', () => {
  let component: RisraComponent;
  let fixture: ComponentFixture<RisraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RisraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
