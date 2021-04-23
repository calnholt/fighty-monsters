import { Path, MONSTERS_PATH } from './../../data/data';
import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { Monster } from './monster';
import { CardDataService, ElectronStoreService, GameIcon, GameTerm } from 'card-builder-framework';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonsterComponent implements OnInit, OnChanges {
  @Input() monster!: Monster;
  CACHED_IMAGE: Path;
  gameIcons: Array<GameIcon> = [];
  gameTerms: Array<GameTerm> = [];

  constructor(
    private cardDataService: CardDataService,
    private electronStoreService: ElectronStoreService
  ) {
  }

  ngOnInit() {
    this.electronStoreService.getLookupList('GAME_ICONS').then((res: Array<GameIcon>) =>  {
      this.gameIcons = res;
    });
    this.electronStoreService.getLookupList('GAME_TERMS').then((res: Array<GameIcon>) =>  {
      this.gameTerms = res;
    });
  }

  ngOnChanges() {
    this.CACHED_IMAGE = null;
  }

  getText(text: string): string {
    return this.cardDataService.getAbilityText(text, 'term', 'term-img', this.gameTerms, this.gameIcons);
  }

  getMonsterImage(): Path {
    if (this.monster && this.monster.name && !this.CACHED_IMAGE) {
      this.CACHED_IMAGE = MONSTERS_PATH + this.monster.name.toLowerCase() + '.png';
    }
    return this.CACHED_IMAGE;
  }
}
