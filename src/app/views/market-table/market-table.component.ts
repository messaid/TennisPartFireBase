import { ProductEnum } from './../../enums/product-enum';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Product[] = [
  {title: 'raqut', category: ProductEnum.Bag, price: '20', description : '', displayName: 'Moha', uid : '' },
  {title: 'shoes', category: ProductEnum.Shoes, price: '20', description : '', displayName: 'Moha', uid : '' },
];

@Component({
  selector: 'app-market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.component.scss']
})
export class MarketTableComponent implements OnInit {

  // displayedColumns: string[] = ['Name', 'category', 'Title', 'Price', 'Status', 'Zip Code'];
  displayedColumns: string[] = ['name', 'category', 'title', 'price'];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor() { }

  ngOnInit() {
  }


}
