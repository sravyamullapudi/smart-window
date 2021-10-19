import { TestBed } from '@angular/core/testing';

import { SmartWindowLibService } from './smart-window-lib.service';

describe('SmartWindowLibService', () => {
  let service: SmartWindowLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartWindowLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
