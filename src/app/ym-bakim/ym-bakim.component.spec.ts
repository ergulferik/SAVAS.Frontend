import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YmBakimComponent } from './ym-bakim.component';

describe('YmBakimComponent', () => {
  let component: YmBakimComponent;
  let fixture: ComponentFixture<YmBakimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YmBakimComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YmBakimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
