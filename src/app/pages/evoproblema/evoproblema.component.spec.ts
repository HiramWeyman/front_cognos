import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvoproblemaComponent } from './evoproblema.component';

describe('EvoproblemaComponent', () => {
  let component: EvoproblemaComponent;
  let fixture: ComponentFixture<EvoproblemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvoproblemaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvoproblemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
