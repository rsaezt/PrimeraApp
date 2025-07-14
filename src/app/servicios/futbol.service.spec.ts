import { TestBed } from '@angular/core/testing';
import { FutbolService } from './futbol.service';
import { HttpClientModule } from '@angular/common/http';

describe('FutbolService', () => {
  let service: FutbolService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FutbolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
