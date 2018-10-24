import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'youtube-widget',
  templateUrl: './youtube-widget.component.html',
  styleUrls: ['./youtube-widget.component.css']
})
export class YoutubeWidgetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadScript();
  }

  loadScript() {
    const script: string = 'https://apis.google.com/js/platform.js';
    const node = document.createElement('script');
    node.src = script;
    node.type = 'text/javascript';
    node.async = false;
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
  }

}