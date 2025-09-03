import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescteraComponent } from './desctera.component';

describe('DescteraComponent', () => {
  let component: DescteraComponent;
  let fixture: ComponentFixture<DescteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescteraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
