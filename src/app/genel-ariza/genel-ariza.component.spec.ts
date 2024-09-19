import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenelArizaComponent } from './genel-ariza.component';

describe('GenelArizaComponent', () => {
  let component: GenelArizaComponent;
  let fixture: ComponentFixture<GenelArizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenelArizaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenelArizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
