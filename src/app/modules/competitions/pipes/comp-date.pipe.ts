import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compDate'
})
export class CompDatePipe implements PipeTransform {

  transform(value: Date, args?: any): string {
    return value.toLocaleDateString("it-it", { day: "numeric", year: "numeric", month: "long" })
  }

}
