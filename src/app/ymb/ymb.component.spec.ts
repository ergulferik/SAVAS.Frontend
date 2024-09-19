import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YMBComponent } from './ymb.component';

describe('YMBComponent', () => {
  let component: YMBComponent;
  let fixture: ComponentFixture<YMBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YMBComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YMBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
