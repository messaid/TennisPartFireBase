import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackBarEnum } from 'src/app/enums/snackbar-enum';

@Component({
  selector: 'app-custom-snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit {
  public message: string;
  public type;
  constructor(@Inject(MAT_SNACK_BAR_DATA) data){
    this.message = data.message;
    this.type = data.type;
   }

  ngOnInit() {
  }

}
