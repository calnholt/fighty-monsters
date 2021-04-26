import { Component, OnInit } from '@angular/core';
import { ElectronStoreService } from 'card-builder-framework';
import { UtilityInterface } from 'card-builder-framework/lib/common/components/utilities/models/utility-models';
import { GameBackground } from '../../monster/monster/monster';

@Component({
  selector: 'manage-backgrounds',
  templateUrl: './manage-backgrounds.component.html',
  styleUrls: ['./manage-backgrounds.component.scss']
})
export class ManageBackgroundsComponent implements UtilityInterface<GameBackground>, OnInit {

  gameBackgrounds: Array<GameBackground> = [];

  constructor(
    private electronStoreService: ElectronStoreService
  ) { }

  ngOnInit() {
    this.load();
  }

  save(): void {
    const backgroundsToSave = this.validate();
    if (backgroundsToSave) {
      this.electronStoreService.saveStorage('backgrounds', backgroundsToSave, 'name').then((result: Array<GameBackground>) => {
        this.gameBackgrounds = result;
        alert('Saved!');
      });
    }
  }
  load(): void {
    this.electronStoreService.getStorageList('backgrounds').then((res: Array<GameBackground>) =>  {
      if (!res.length) {
        this.gameBackgrounds = [new GameBackground()];
      }
      else {
        this.gameBackgrounds = res;
      }
    });
  }
  validate(): GameBackground[] {
    const filteredBackgrounds = this.gameBackgrounds.filter(i => i.name && i.src);
    const names = filteredBackgrounds.map(i => i.name);
    const nameMap = {};
    for (const name of names) {
      if (nameMap[name]) {
        alert('Icon names must be unique.');
        return null;
      }
      nameMap[name] = true;
    }
    return filteredBackgrounds;
  }
  delete(index: number): void {
    this.gameBackgrounds.splice(index, 1);
  }
  addNewRow(): void {
    this.gameBackgrounds.push(new GameBackground());
  }

}
