import { TestBed } from '@angular/core/testing';

import { AlerifyService } from './alerify.service';

describe('AlerifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlerifyService = TestBed.get(AlerifyService);
    expect(service).toBeTruthy();
  });
});
