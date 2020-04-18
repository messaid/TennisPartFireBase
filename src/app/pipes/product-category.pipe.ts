import { ProductEnum } from './../enums/product-enum';
import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'productCategory'
})
export class ProductCategoryPipe implements PipeTransform {

  
  transform(value: number): string {
    if (!isNullOrUndefined(value)) {
      switch (value) {
        case ProductEnum.Bag: return 'Bag';
        case ProductEnum.Rackets: return 'Rackets';
        case ProductEnum.Other: return 'Other';
        case ProductEnum.Shoes: return 'Shoes';
      }
    }
    return '-';
  }

}
