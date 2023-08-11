import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblematicaComponent } from './problematica.component';

describe('ProblematicaComponent', () => {
  let component: ProblematicaComponent;
  let fixture: ComponentFixture<ProblematicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblematicaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblematicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
