import { MarketService } from './../../service/market.service';
import { selectProductsEnum, selectUser } from './../../store/selectors/user.selector';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { IUserState } from 'src/app/store/state/user.state';
import { Observable, BehaviorSubject, observable } from 'rxjs';
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
  public addProductForm;
  private readOnly = new BehaviorSubject<boolean>(false);
  public readOnly$ = this.readOnly.asObservable();

  constructor(private dialogRef: MatDialogRef<MarketAddComponent>,
              private snackbar: SnackbarService,
              @Inject(MAT_DIALOG_DATA) dataDialog,
              private spinnerService: SpinnerService, private marketService: MarketService,
              private storeUser: Store<{ user: IUserState }>) {
                this.addProductForm = new FormGroup({
                  name: new FormControl(dataDialog.product.displayName, {validators: [Validators.required]}), 
                  title: new FormControl(dataDialog.product.title, {validators: [Validators.required]}),
                  category: new FormControl(dataDialog.product.category, {validators: [Validators.required] }),
                  price: new FormControl(dataDialog.product.price, Validators.required),
                  description: new FormControl(dataDialog.product.description, { validators: [Validators.required] }),
               });
                this.readOnly.next(dataDialog.disabled);
                this.storeUser.pipe(select(selectUser)).subscribe(data => {
                  if (!dataDialog.disabled) {
                    this.addProductForm.controls['name'].setValue(data.user.displayName);
                    this.uid = data.user.uid;
                  }
              });
                this.categories$ = this.storeUser.pipe(select(selectProductsEnum));

              }

  ngOnInit() {
    this.onChangesValuesPrice();
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
      this.snackbar.snackBarSuccess('The ad has been added successfully...');
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
