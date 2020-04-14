import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnumDisplayedObject } from 'src/app/enums/displayed-object-enum';
import { selectRankings } from 'src/app/store/selectors/user.selector';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})

export class ProfilComponent implements OnInit {

  public rankings$: Observable<Array<EnumDisplayedObject>>;

  constructor(private dialogRef: MatDialogRef<ProfilComponent>,
              private storeUser: Store<{ user: IUserState }>) {
    this.rankings$ = this.storeUser.pipe(select(selectRankings));
   }
  public editUserForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    zipCode: new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(5)]),
    ranking: new FormControl('', {validators: [Validators.required], updateOn: 'blur'}),
    name: new FormControl('', Validators.required),
    phonenumber: new FormControl('', {validators: [Validators.required], updateOn: 'change'}),
  });

  ngOnInit() {
  }

  saveChanges(formData: FormData) {
    console.log("saved");
  }

  closePopup() {
    this.dialogRef.close();
  }

}
