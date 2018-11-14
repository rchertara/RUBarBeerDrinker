import { TestBed, inject } from '@angular/core/testing';

import { BarsService } from './bars.service';
import {TransactionsService} from './transactions.service';

describe('TransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BarsService]
    });
  });

  it('should be created', inject([TransactionsService], (service: TransactionsService) => {
    expect(service).toBeTruthy();
  }));
});
