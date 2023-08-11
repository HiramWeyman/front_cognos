import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisfuncComponent } from './analisisfunc.component';

describe('AnalisisfuncComponent', () => {
  let component: AnalisisfuncComponent;
  let fixture: ComponentFixture<AnalisisfuncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisfuncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisisfuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
