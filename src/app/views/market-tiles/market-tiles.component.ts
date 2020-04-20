import { Product } from './../../models/product';
import { observable, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IMarketState } from 'src/app/store/state/market.state';
import { selectProducts } from 'src/app/store/selectors/market.selector';
import { MatDialog } from '@angular/material';
import { MarketAddComponent } from '../market-add/market-add.component';

@Component({
  selector: 'app-market-tiles',
  templateUrl: './market-tiles.component.html',
  styleUrls: ['./market-tiles.component.scss']
})
export class MarketTilesComponent implements OnInit {

  public products$: Observable<Array<Product>>;
  constructor(private storeMarket: Store<{ market: IMarketState }>, public dialog: MatDialog) {
    this.products$ = this.storeMarket.pipe(select(selectProducts));
  }

  ngOnInit() {
  }

  showProduct(element: Product) {
    const dialogRef = this.dialog.open(MarketAddComponent, {
      width: '500px',
      disableClose: true,
      data: {
        disabled: true,
        product : { displayName : element.displayName, category: element.category , 
          title: element.title, price: element.price, description: element.description}as Product,
      },
    });
  }

}
