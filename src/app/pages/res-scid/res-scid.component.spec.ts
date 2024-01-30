import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResScidComponent } from './res-scid.component';

describe('ResScidComponent', () => {
  let component: ResScidComponent;
  let fixture: ComponentFixture<ResScidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResScidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResScidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
