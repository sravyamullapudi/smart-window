import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartWindowLibComponent } from './smart-window-lib.component';

describe('SmartWindowLibComponent', () => {
  let component: SmartWindowLibComponent;
  let fixture: ComponentFixture<SmartWindowLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartWindowLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartWindowLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
