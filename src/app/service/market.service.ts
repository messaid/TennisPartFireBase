import { setProducts } from './../store/actions/market.action';
import { ProductEnum } from './../enums/product-enum';
import { Product } from './../models/product';
import { SpinnerService } from './spinner.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collections } from '../constants/collections';
import { MatDialogRef } from '@angular/material';
import { MarketAddComponent } from '../views/market-add/market-add.component';
import { Store } from '@ngrx/store';
import * as MarketActions from '../store/actions/market.action';
import { IMarketState } from '../store/state/market.state';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  //list = new Array<Product>();
  constructor(private firestore: AngularFirestore,
              private storeMarket: Store<{ state: IMarketState }>) { }

  publishAd(uid: string, displayName: string, title: string, category: ProductEnum, price: string, description: string) {

    const currProduct: Product = {
      uid,
      displayName,
      title,
      category,
      price,
      description
    };
    return this.firestore.collection(Collections.PRODUCTS_COLLECTION()).add(currProduct);
  }

  getAllProducts() {
    this.firestore.collection(Collections.PRODUCTS_COLLECTION()).ref.onSnapshot(snap => {
      const list = new Array<Product>();
      snap.forEach(product => {
        list.push((product.data()) as Product);
        });
      this.storeMarket.dispatch(MarketActions.setProducts({products : list }));
      });
  }
}
