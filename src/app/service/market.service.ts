import { ProductEnum } from './../enums/product-enum';
import { Product } from './../models/product';
import { SpinnerService } from './spinner.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Collections } from '../constants/collections';
import { MatDialogRef } from '@angular/material';
import { MarketAddComponent } from '../views/market-add/market-add.component';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private firestore: AngularFirestore,
              private spinnerService: SpinnerService) { }

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
}
