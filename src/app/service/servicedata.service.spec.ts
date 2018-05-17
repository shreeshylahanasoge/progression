import { TestBed, inject } from '@angular/core/testing';

import { ServicedataService } from './servicedata.service';

describe('ServicedataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicedataService]
    });
  });

  it('should be created', inject([ServicedataService], (service: ServicedataService) => {
    expect(service).toBeTruthy();
  }));
});
