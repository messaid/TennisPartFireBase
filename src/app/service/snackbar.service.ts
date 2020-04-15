import { CustomSnackbarComponent } from './../generic-components/custom-snackbar/custom-snackbar.component';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { SnackBarEnum } from '../enums/snackbar-enum';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  snackBarSuccess(message: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['sucess-snackbar'],
      data: {
        message: message.toString(),
        type: SnackBarEnum.Sucess,
      },
    });
  }

  snackBarError(message: string) {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['error-snackbar'],
      data: {
        message: message.toString(),
        type: SnackBarEnum.Error,
      },
    });
  }

}
