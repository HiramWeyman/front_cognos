import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResBaianComponent } from './res-baian.component';

describe('ResBaianComponent', () => {
  let component: ResBaianComponent;
  let fixture: ComponentFixture<ResBaianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResBaianComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResBaianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
