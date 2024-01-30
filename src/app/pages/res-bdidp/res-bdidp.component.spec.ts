import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResBdidpComponent } from './res-bdidp.component';

describe('ResBdidpComponent', () => {
  let component: ResBdidpComponent;
  let fixture: ComponentFixture<ResBdidpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResBdidpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResBdidpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
