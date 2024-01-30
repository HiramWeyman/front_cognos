import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessclComponent } from './resscl.component';

describe('RessclComponent', () => {
  let component: RessclComponent;
  let fixture: ComponentFixture<RessclComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RessclComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RessclComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
