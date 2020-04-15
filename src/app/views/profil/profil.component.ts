import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { selectRankings, selectUser } from 'src/app/store/selectors/user.selector';
import { ErrorMessages } from 'src/app/constants/error-messages';
import { UserDTO } from 'src/app/models/user';
import { isNullOrUndefined } from 'util';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {
  private userdoc;
  public userStatus$: Observable<UserDTO>;
  public rankings$: Observable<Array<EnumDisplayedObject>>;
  private lastValidNumber = '';
  private lastValidZipCode = '';
  public disabled = true;
  public editUserForm = new FormGroup({
    email: new FormControl({ value: '', disabled: this.disabled }, {validators: [Validators.required, Validators.email]}),
    zipCode: new FormControl({ value: ''}, {validators: [Validators.minLength(5), Validators.maxLength(5)], updateOn: 'change' }),
    ranking: new FormControl({ value: 1}, {updateOn: 'blur' }),
    name: new FormControl({ value: ''}, Validators.required),
    phonenumber: new FormControl({ value: ''}, { validators: [Validators.required], updateOn: 'change' }),
  });
  constructor(private dialogRef: MatDialogRef<ProfilComponent>,
              private authService: AuthService,
              private spinnerService: SpinnerService,
              private storeUser: Store<{ user: IUserState }>) {
  }

  onChangesValuesPhone(): void {
    this.editUserForm.get('phonenumber').valueChanges.subscribe(
      val => {
        if (!isNullOrUndefined(val)){
          if (isNaN(val) || val < 0 || val.includes('.')) {
            this.editUserForm.controls['phonenumber'].setValue(this.lastValidNumber);
          } else {
            this.lastValidNumber = val;
          }
        }
      }
    );
  }

  
  onChangesValuesZipCode(): void {
    this.editUserForm.get('zipCode').valueChanges.subscribe(
      val => {
        if (!isNullOrUndefined(val)){
          if (isNaN(val) || val < 0 || val.includes('.')) {
            this.editUserForm.controls['zipCode'].setValue(this.lastValidZipCode);
          } else {
            this.lastValidZipCode = val;
          }
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
    this.storeUser.pipe(select(selectUser)).subscribe(data => {
      this.editUserForm.controls['name'].setValue(data.user.displayName);
      this.editUserForm.controls['email'].setValue(data.user.email);
      this.editUserForm.controls['phonenumber'].setValue(data.user.phoneNumber);
      this.editUserForm.controls['ranking'].setValue(data.user.ranking);
      this.editUserForm.controls['zipCode'].setValue(data.user.postalCode);
      this.userdoc = data.doc;
    });
    this.rankings$ = this.storeUser.pipe(select(selectRankings));
    this.onChangesValuesPhone();
    this.onChangesValuesZipCode();
  }

  cancel(){
    this.dialogRef.close();
  }

  saveChanges(formData: FormData) {
    this.spinnerService.updateMessage('Updating profil...');
    this.spinnerService.start();
    this.authService.updateUser(this.userdoc, formData['name'], formData['phonenumber'], formData['ranking'], formData['zipCode'])
    .then(user => {
      // TO DO SNACK 
      this.dialogRef.close();      
      this.spinnerService.stop();
    }).catch(err => {
      // TO DO SNACK 
      console.log(err);
      this.spinnerService.stop();
    });
  }

  closePopup() {
    this.dialogRef.close();
  }

}
