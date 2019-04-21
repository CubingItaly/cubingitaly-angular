import { Pipe, PipeTransform } from '@angular/core';
import { CompetitionModel } from 'src/app/models/competition.model';

@Pipe({
  name: 'compDays'
})
export class CompDaysPipe implements PipeTransform {

  transform(comp: CompetitionModel, args?: any): string {
    if ((comp.startDate.getDate() === comp.endDate.getDate()) && (comp.startDate.getMonth() === comp.endDate.getMonth()) && (comp.startDate.getFullYear() === comp.endDate.getFullYear())) {
      return comp.startDate.toLocaleDateString("it-it", { day: "numeric", year: "numeric", month: "long" });
    } else {
      if (comp.startDate.getMonth() < comp.endDate.getMonth()) {
        return (comp.startDate.toLocaleDateString("it-it", { day: "numeric", month: "long" })) + " - " + (comp.endDate.toLocaleDateString("it-it", { day: "numeric", month: "long" })) + " " + (comp.startDate.toLocaleDateString("it-it", { year: "numeric" }));
      } else {
        return (comp.startDate.toLocaleDateString("it-it", { day: "numeric" })) + "-" + (comp.endDate.toLocaleDateString("it-it", { day: "numeric", year: "numeric", month: "long" }));
      }
    }
  }

}


