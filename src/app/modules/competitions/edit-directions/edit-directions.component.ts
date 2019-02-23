import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CompetitionService } from '../services/competition.service';
import { TravelMeanModel } from 'src/app/models/competition/travelmean.model';
import { CompetitionModel } from 'src/app/models/competition.model';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { FormControl } from '@angular/forms';
import * as Editor from 'src/assets/ckeditor/ckeditor';

@Component({
  selector: 'edit-directions-info',
  templateUrl: './edit-directions.component.html',
  styleUrls: ['./edit-directions.component.css']
})
export class EditDirectionsComponent implements OnInit {

  @Input() competition: CompetitionModel;
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  travelMeans: TravelMeanModel[];
  directions: DirectionsModel[];
  filteredMeans: TravelMeanModel[];
  newDirection: FormControl = new FormControl();
  editor = Editor;
  editingDirection: DirectionsModel;
  editing: boolean;

  constructor(private compSVC: CompetitionService) { }


  ngOnInit() {
    this.compSVC.getTravelMeans().subscribe((res: TravelMeanModel[]) => {
      this.travelMeans = this.sortMeans(res);
      this.compSVC.getDirections(this.competition.id).subscribe((res: DirectionsModel[]) => {
        this.directions = res.sort((a: DirectionsModel, b: DirectionsModel) => {
          if (a.mean.name > b.mean.name) {
            return 1;
          } else if (a.mean.name < b.mean.name) {
            return -1;
          }
          return 0;
        });
        this.filterMeans();
      });
    });
  }

  addMean() {
    const mean = this.newDirection.value;
    if (mean) {
      let newDirection: DirectionsModel = new DirectionsModel();
      newDirection.mean = mean;
      newDirection.directions = "";
      this.compSVC.createDirections(newDirection, this.competition.id).subscribe((res: DirectionsModel) => {
        this.directions.push(res);
        this.directions = [...this.directions];
        this.filterMeans();
        this.newDirection.setValue("");
      });
    }
  }

  filterMeans() {
    this.filteredMeans = this.travelMeans.filter((t: TravelMeanModel) => this.directions.findIndex((d: DirectionsModel) => d.mean.id === t.id) < 0);
  }

  sortMeans(means: TravelMeanModel[]): TravelMeanModel[] {
    return means.sort((a: TravelMeanModel, b: TravelMeanModel) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  deleteMean(id: number) {
    this.compSVC.deleteDirections(id, this.competition.id).subscribe(() => {
      let deleted: DirectionsModel = this.directions.find((d: DirectionsModel) => d.id === id);
      this.directions = this.directions.filter((d: DirectionsModel) => d.id !== id);
      this.filteredMeans.push(deleted.mean);
      this.filteredMeans = this.sortMeans(this.filteredMeans);
    });
  }

  updateMean(direction: DirectionsModel) {
    this.editingDirection = direction;
    this.editing = true;
  }

  saveMean() {
    this.compSVC.updateDirections(this.editingDirection, this.competition.id).subscribe((res: DirectionsModel) => {
      let index: number = this.directions.findIndex((d:DirectionsModel)=> d.id===res.id);
      this.directions[index]=res;
      this.editing=false;
      this.editingDirection=null;
      this.actionAfterUpdate();
    });
  }

  private actionAfterUpdate() {
    const pageTitle = document.querySelector('h1') as HTMLElement;
    pageTitle.scrollIntoView();
    this.updated.emit(true);
    setTimeout(() => {
      this.updated.emit(false);
    }, 7000);
  }


}
