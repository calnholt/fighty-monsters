import { MonsterService } from './monster.service';
import { Component, OnInit } from '@angular/core';
import { Monster } from './monster/monster';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'monsters',
  templateUrl: './monsters.component.html',
  styleUrls: ['./monsters.component.scss']
})
export class MonstersComponent implements OnInit {
  monsters: Array<Monster>;
  constructor(private monsterService: MonsterService) { }
  ngOnInit() {
    this.monsters = this.monsterService.getMonsters();
  }

}
