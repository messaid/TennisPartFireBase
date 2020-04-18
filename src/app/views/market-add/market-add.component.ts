import { MarketService } from './../../service/market.service';
import { selectProducts, selectUser } from './../../store/selectors/user.selector';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IUserState } from 'src/app/store/state/user.state';
import { Observable } from 'rxjs';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { isNullOrUndefined } from 'util';
import { ErrorMessages } from 'src/app/constants/error-messages';
import { SpinnerService } from 'src/app/service/spinner.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-market-add',
  templateUrl: './market-add.component.html',
  styleUrls: ['./market-add.component.scss']
})
export class MarketAddComponent implements OnInit {
  public categories$: Observable<Array<EnumDisplayedObject>>;
  private lastValidPrice = '';
  private uid = '';
  public addProductForm = new FormGroup({
     name: new FormControl({ value: '', disabled: true }, {validators: [Validators.required]}),
     title: new FormControl({ value: '', disabled: false }, {validators: [Validators.required]}),
     category: new FormControl({ value: '', disabled: false },{validators: [Validators.required] }),
     price: new FormControl({ value: '', disabled: false }, Validators.required),
     description: new FormControl({ value: '', disabled: false }, { validators: [Validators.required] }),
  });

  constructor(private dialogRef: MatDialogRef<MarketAddComponent>,
              private snackbar: SnackbarService,
              private spinnerService: SpinnerService, private marketService: MarketService,
              private storeUser: Store<{ user: IUserState }>) { }

  ngOnInit() {
    this.onChangesValuesPrice();
    this.storeUser.pipe(select(selectUser)).subscribe(data => {
      this.addProductForm.controls['name'].setValue(data.user.displayName);
      this.uid = data.user.uid;
    });
    this.categories$ = this.storeUser.pipe(select(selectProducts));
  }

  closePopup() {
    this.dialogRef.close();
  }

  publish(formData: FormData) {
    this.spinnerService.updateMessage('Publishing...');
    this.spinnerService.start();
    this.marketService.publishAd(this.uid, this.addProductForm.get('name').value,
    formData['title'], formData['category'], formData['price'], formData['description'])
    .then(product => {
      product.get().then(x => {
      this.dialogRef.close();
      this.spinnerService.stop();
      this.snackbar.snackBarSuccess('The ad has been successfully...');
      });
    }).catch(err => {
      this.snackbar.snackBarError('Error when publishing your ad...');
      this.spinnerService.stop();
    });
  }


  getErrorMessage(fieldName: string){
    return ErrorMessages.PRODUCT_MISSING_FIELD(fieldName);
  }

  onChangesValuesPrice(): void {
    this.addProductForm.get('price').valueChanges.subscribe(
      val => {
        if (!isNullOrUndefined(val)){
          if (isNaN(val) || val < 0 || val.includes('.')) {
            this.addProductForm.controls['price'].setValue(this.lastValidPrice);
          } else {
            this.lastValidPrice = val;
          }
        }
      }
    );
  }
}
