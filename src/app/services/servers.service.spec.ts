import { TestBed, inject } from '@angular/core/testing';

import { ServersService } from './servers.service';

describe('ServersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServersService]
    });
  });

  it('should be created', inject([ServersService], (service: ServersService) => {
    expect(service).toBeTruthy();
  }));
});
