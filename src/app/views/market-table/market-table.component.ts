import { MarketService } from './../../service/market.service';
import { Product } from './../../models/product';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IMarketState } from 'src/app/store/state/market.state';
import { selectProducts } from 'src/app/store/selectors/market.selector';

const ELEMENT_DATA: Product[] = [
  // {title: 'raqut', category: ProductEnum.Bag, price: '20', description : '', displayName: 'Moha', uid : '' },
  // {title: 'shoes', category: ProductEnum.Shoes, price: '20', description : '', displayName: 'Moha', uid : '' },
];

@Component({
  selector: 'app-market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.component.scss']
})
export class MarketTableComponent implements OnInit {
  public displayedColumns: string[] = ['name', 'category', 'title', 'price'];
  public dataSource = new MatTableDataSource<Product>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private marketService: MarketService,
              private storeMarket: Store<{ market: IMarketState }>) {
    this.storeMarket.pipe(select(selectProducts)).subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
    this.marketService.getAllProducts();
  }
}
