import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsesionComponent } from './editsesion.component';

describe('EditsesionComponent', () => {
  let component: EditsesionComponent;
  let fixture: ComponentFixture<EditsesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditsesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
