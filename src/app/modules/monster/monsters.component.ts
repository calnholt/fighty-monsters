import { ElectronStoreService } from 'card-builder-framework';
import { Component, OnInit } from '@angular/core';
import { Monster } from './monster/monster';

@Component({
  selector: 'monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss']
})
export class MonstersComponent implements OnInit {
  monsters: Array<Monster>;
  constructor(private electronStorageService: ElectronStoreService) { }
  ngOnInit() {
    this.electronStorageService.getStorageList('monsters').then((res: Array<Monster>) => {
      this.monsters = res.sort((a,b) => a.name.localeCompare(b.name));
    });
  }

}
