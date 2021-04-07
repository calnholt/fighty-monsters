import { Path, MONSTERS_PATH } from './../../data/data';
import { getAbilityText } from './../../common/cards';
import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Monster, Action } from './monster';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonsterComponent implements OnInit, OnChanges {
  @Input() monster!: Monster;
  CACHED_IMAGE: Path;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.CACHED_IMAGE = null;
  }

  getText(text: string): string {
    return getAbilityText(text, 'term', 'term-img');
  }

  getMonsterImage(): Path {
    if (this.monster && this.monster.name && !this.CACHED_IMAGE) {
      this.CACHED_IMAGE = MONSTERS_PATH + this.monster.name.toLowerCase() + '.png';
    }
    return this.CACHED_IMAGE;
  }
}
