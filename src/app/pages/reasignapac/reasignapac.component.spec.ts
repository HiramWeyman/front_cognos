import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasignapacComponent } from './reasignapac.component';

describe('ReasignapacComponent', () => {
  let component: ReasignapacComponent;
  let fixture: ComponentFixture<ReasignapacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReasignapacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReasignapacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
