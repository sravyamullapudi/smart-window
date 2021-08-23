import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomWindowComponent } from './custom-window.component';

describe('CustomWindowComponent', () => {
  let component: CustomWindowComponent;
  let fixture: ComponentFixture<CustomWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
