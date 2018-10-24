import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(style) {
    //We take for granted that HTML is trusted
    return this.sanitizer.bypassSecurityTrustHtml(style);
  }

}
