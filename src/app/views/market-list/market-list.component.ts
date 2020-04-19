import { MarketAddComponent } from './../market-add/market-add.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-market-list',
  templateUrl: './market-list.component.html',
  styleUrls: ['./market-list.component.scss']
})
export class MarketListComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addProduct() {
    const dialogRef = this.dialog.open(MarketAddComponent, {
      width: '500px',
      disableClose: true,
      data: {
        message: 'api',
      },
    });
  }
}
