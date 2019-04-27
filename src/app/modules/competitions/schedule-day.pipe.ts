import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleDay'
})
export class ScheduleDayPipe implements PipeTransform {

  transform(value: Date): string {
    return value.toLocaleDateString("it-it", { weekday:"long", day: "numeric", year: "numeric", month: "long" })
  }

}
