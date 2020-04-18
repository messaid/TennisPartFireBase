import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTilesComponent } from './market-tiles.component';

describe('MarketTilesComponent', () => {
  let component: MarketTilesComponent;
  let fixture: ComponentFixture<MarketTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
