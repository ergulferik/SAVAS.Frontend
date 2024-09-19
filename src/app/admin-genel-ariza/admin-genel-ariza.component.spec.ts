import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenelArizaComponent } from './admin-genel-ariza.component';

describe('AdminGenelArizaComponent', () => {
  let component: AdminGenelArizaComponent;
  let fixture: ComponentFixture<AdminGenelArizaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGenelArizaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenelArizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
