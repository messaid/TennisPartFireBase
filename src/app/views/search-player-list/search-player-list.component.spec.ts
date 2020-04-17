import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPlayerListComponent } from './search-player-list.component';

describe('SearchPlayerListComponent', () => {
  let component: SearchPlayerListComponent;
  let fixture: ComponentFixture<SearchPlayerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlayerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
