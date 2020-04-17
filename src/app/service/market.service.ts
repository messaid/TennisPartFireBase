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
              private dialogRef: MatDialogRef<MarketAddComponent>,
              private spinnerService: SpinnerService) { }

  publishAd(uid: string, displayName: string, title: string, category: ProductEnum, price: string, description: string) {
    this.spinnerService.updateMessage('Publishing...');
    this.spinnerService.start();
    const currProduct: Product = {
      uid,
      displayName,
      title,
      category,
      price,
      description
    };
    this.firestore.collection(Collections.PRODUCTS_COLLECTION()).add(currProduct)
      .then(product => {
        product.get().then(x => {
          // this.currentUser = x.data();
          // this.eventAuthErrorRegister.next('');
          // this.storeUser.dispatch(UserActions.setUser({ user: {doc: x.id, user: currUser} }));
          // this.router.navigate(['/dashboard']);
          this.dialogRef.close();
        });
      }).catch(err => {
        this.dialogRef.close();
        //this.eventAuthErrorRegister.next(err);
        this.spinnerService.stop();
      });
  }
}
