import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DirectionsModel } from 'src/app/models/competition/directions.model';
import { CompetitionModel } from 'src/app/models/competition.model';
import { FormControl } from '@angular/forms';
import { TravelMeanModel } from 'src/app/models/competition/travelmean.model';
import * as Editor from 'src/assets/ckeditor/ckeditor';
import { CompetitionService } from '../../competitions/services/competition.service';
import { CompetitionEditService } from '../services/competition-edit.service';

@Component({
  selector: 'edit-directions-info',
  templateUrl: './directions-edit.component.html',
  styleUrls: ['./directions-edit.component.css']
})
export class DirectionsEditComponent implements OnInit {

  @Input() competition: CompetitionModel;
  @Input() directions: DirectionsModel[];
  @Output() directionsChange: EventEmitter<DirectionsModel[]> = new EventEmitter<DirectionsModel[]>();
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  travelMeans: TravelMeanModel[];
  filteredMeans: TravelMeanModel[];
  newDirection: FormControl = new FormControl();
  editor = Editor;
  editingDirection: DirectionsModel;
  editing: boolean;

  constructor(private compSVC: CompetitionEditService) { }


  ngOnInit() {
    this.compSVC.getTravelMeans().subscribe((res: TravelMeanModel[]) => {
      this.travelMeans = this.sortMeans(res);
      this.directions = this.directions.sort((a: DirectionsModel, b: DirectionsModel) => {
        if (a.mean.name > b.mean.name) {
          return 1;
        } else if (a.mean.name < b.mean.name) {
          return -1;
        }
        return 0;
      });
      this.filterMeans();
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
      this.directionsChange.emit(this.directions);
    });
  }

  updateMean(direction: DirectionsModel) {
    this.editingDirection = direction;
    this.editing = true;
  }

  saveMean() {
    this.compSVC.updateDirections(this.editingDirection, this.competition.id).subscribe((res: DirectionsModel) => {
      let index: number = this.directions.findIndex((d: DirectionsModel) => d.id === res.id);
      this.directions[index] = res;
      this.editing = false;
      this.editingDirection = null;
      this.directionsChange.emit(this.directions);
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