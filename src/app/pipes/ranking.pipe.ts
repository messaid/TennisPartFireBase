import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'ranking'
})
export class RankingPipe implements PipeTransform {

  transform(value: string): string {
    if (!isNullOrUndefined(value)) {
      return value.substring(1, value.length - 1);
    }
    return '';
  }

}
