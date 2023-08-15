import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasirracionalesComponent } from './ideasirracionales.component';

describe('IdeasirracionalesComponent', () => {
  let component: IdeasirracionalesComponent;
  let fixture: ComponentFixture<IdeasirracionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeasirracionalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdeasirracionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
