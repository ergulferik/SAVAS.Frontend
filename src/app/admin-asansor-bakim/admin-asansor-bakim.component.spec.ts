import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsansorBakimComponent } from './admin-asansor-bakim.component';

describe('AdminAsansorBakimComponent', () => {
  let component: AdminAsansorBakimComponent;
  let fixture: ComponentFixture<AdminAsansorBakimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAsansorBakimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAsansorBakimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
