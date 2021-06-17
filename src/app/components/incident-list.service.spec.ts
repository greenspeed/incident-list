import { TestBed } from '@angular/core/testing';

import { IncidentListService } from './incident-list.service';

describe('IncidentListService', () => {
  let service: IncidentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncidentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
