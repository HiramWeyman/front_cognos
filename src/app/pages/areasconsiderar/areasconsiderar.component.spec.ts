import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasconsiderarComponent } from './areasconsiderar.component';

describe('AreasconsiderarComponent', () => {
  let component: AreasconsiderarComponent;
  let fixture: ComponentFixture<AreasconsiderarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreasconsiderarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasconsiderarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
