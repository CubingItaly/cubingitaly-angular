import { Component, OnInit } from '@angular/core';
import { TitleManagerService } from 'src/app/services/title-manager.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  banners = [
    "https://farm2.staticflickr.com/1972/44494563805_35236eb696_z.jpg",
    "https://farm2.staticflickr.com/1974/43592534840_d4859a8f25_o.png",
    "https://farm2.staticflickr.com/1956/45409356361_709b1b283b_o.png",
    "https://farm2.staticflickr.com/1952/43592532970_2f63e2472d_o.png"
  ]

  constructor(private titleSVC: TitleManagerService) { }

  ngOnInit() {
    this.titleSVC.setTitle("Cubing Italy");
  }

}
