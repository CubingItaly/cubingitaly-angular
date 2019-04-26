import { Component, OnInit, Input } from '@angular/core';
import { ExtraTabModel } from 'src/app/models/competition/extratab.model';
import { CompetitionEditService } from '../services/competition-edit.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Editor from 'src/assets/ckeditor/ckeditor';

@Component({
  selector: 'extra-tab-edit',
  templateUrl: './extra-tab-edit.component.html',
  styleUrls: ['./extra-tab-edit.component.css']
})
export class ExtraTabEditComponent implements OnInit {

  tabs: ExtraTabModel[];
  @Input() competitionId: string;
  editingTab: number;
  editing: boolean;
  tabForm: FormGroup;
  editor = Editor;

  constructor(private compSVC: CompetitionEditService) { }

  ngOnInit() {
    this.getTabs();
    this.tabForm = new FormGroup({
      name: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required)
    });
  }

  private getTabs() {
    this.compSVC.getCompetitionExtraTabs(this.competitionId).subscribe((res) => this.tabs = res);
    this.editing = false;
    this.editingTab = -1;
  }


  deleteTab(id: string) {
    this.compSVC.deleteTab(this.competitionId, id).subscribe(() => this.getTabs());
  }

  moveTab(id: string, delta: number) {
    this.compSVC.moveTab(this.competitionId, id, delta).subscribe(() => this.getTabs());
  }

  editTab(id: number) {
    this.editing = !this.editing;
    if (this.editing) {
      this.editingTab = id;
      let tab: ExtraTabModel = this.tabs.find((t: ExtraTabModel) => t.id === id);
      this.tabForm.get("name").setValue(tab.name);
      this.tabForm.get("content").setValue(tab.content);
    } else {
      this.editingTab = -1;
      this.cleanForm();
    }
  }

  newTab() {
    this.editingTab = -2;
    this.cleanForm();
    this.editing = true;
  }

  private cleanForm() {
    this.tabForm.get("name").setValue("");
    this.tabForm.get("content").setValue("");
    this.tabForm.clearValidators();
  }

  saveTab() {
    if (this.tabForm.valid) {
      let tab: ExtraTabModel = new ExtraTabModel();
      tab.content = this.tabForm.get("content").value;
      tab.name = this.tabForm.get("name").value;

      if (this.editingTab === -2) {
        this.compSVC.newTab(this.competitionId, tab).subscribe(() => this.getTabs());
      } else if (this.editingTab >= 0) {
        tab.id = this.editingTab;
        tab.indexInComp = this.tabs.find((t: ExtraTabModel) => t.id === this.editingTab).indexInComp;
        this.compSVC.updateTab(this.competitionId, tab).subscribe(() => this.getTabs());
      }
    }
    this.cleanForm();
  }
}
