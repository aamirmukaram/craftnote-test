import { TestBed } from '@angular/core/testing';

import { CraftNoteService } from './craft-note.service';

describe('CraftNoteService', () => {
  let service: CraftNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CraftNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
