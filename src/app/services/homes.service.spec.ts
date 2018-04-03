import { TestBed, inject } from '@angular/core/testing';

import { HomesService } from './homes.service';

describe('HomeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomesService]
    });
  });

  it('should be created', inject([HomesService], (service: HomesService) => {
    expect(service).toBeTruthy();
  }));
});
