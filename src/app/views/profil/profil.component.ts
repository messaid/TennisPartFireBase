import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { selectRankings } from 'src/app/store/selectors/user.selector';
import { ErrorMessages } from 'src/app/constants/error-messages';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {

  public rankings$: Observable<Array<EnumDisplayedObject>>;
  private lastValidNumber = '';
  private lastValidZipCode = '';
  constructor(private dialogRef: MatDialogRef<ProfilComponent>,
              private storeUser: Store<{ user: IUserState }>) {
    this.rankings$ = this.storeUser.pipe(select(selectRankings));
  }

  public editUserForm = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, {validators: [Validators.required, Validators.email]}),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
    ranking: new FormControl('', { validators: [Validators.required], updateOn: 'blur' }),
    name: new FormControl('', Validators.required),
    phonenumber: new FormControl('', { validators: [Validators.required], updateOn: 'change' }),
  });

  onChangesValuesPhone(): void {
    this.editUserForm.get('phonenumber').valueChanges.subscribe(
      val => {
        if (isNaN(val) || val < 0 || val.includes('.')) {
          this.editUserForm.controls['phonenumber'].setValue(this.lastValidNumber);
        } else {
          this.lastValidNumber = val;
        }
      }
    );
  }

  onChangesValuesZipCode(): void {
    this.editUserForm.get('zipCode').valueChanges.subscribe(
      val => {
        if (isNaN(val) || val < 0 || val.includes('.')) {
          this.editUserForm.controls['zipCode'].setValue(this.lastValidZipCode);
        } else {
          this.lastValidZipCode = val;
        }
      }
    );
  }


  getErrorMessagePhone(){
    if (this.editUserForm.controls['phonenumber'].hasError('required')) {
      return ErrorMessages.PHONE_NUMBER_REQUIRED();
    }
  }

  getErrorMessageZipCode(){
    if (this.editUserForm.controls['zipCode'].hasError('required')) {
      return ErrorMessages.ZIP_CODE_REQUIRED();
    }
  }

  ngOnInit() {
    this.onChangesValuesPhone();
    this.onChangesValuesZipCode();
  }

  saveChanges(formData: FormData) {
    console.log("saved");
  }

  closePopup() {
    this.dialogRef.close();
  }

}
