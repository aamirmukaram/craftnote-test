import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CraftNoteComponent } from './craft-note.component';

describe('CraftNoteComponent', () => {
  let component: CraftNoteComponent;
  let fixture: ComponentFixture<CraftNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CraftNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CraftNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
