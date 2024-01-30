import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResCreeComponent } from './res-cree.component';

describe('ResCreeComponent', () => {
  let component: ResCreeComponent;
  let fixture: ComponentFixture<ResCreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResCreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResCreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
