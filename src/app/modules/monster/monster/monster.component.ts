import { Component, OnInit, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { GameBackground, Monster } from './monster';
import { CardDataService, ElectronStoreService, GameIcon, GameTerm, Path } from 'card-builder-framework';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonsterComponent implements OnInit, OnChanges {
  @Input() monster!: Monster;
  gameIcons: Array<GameIcon> = [];
  gameIconMap: Map<string, GameIcon>;
  gameTerms: Array<GameTerm> = [];
  gameBackgrounds: Map<string, GameBackground>;
  cardBackground: string;

  constructor(
    private cardDataService: CardDataService,
    private electronStoreService: ElectronStoreService
  ) {
  }

  ngOnInit() {
    this.electronStoreService.getStorageList('icons').then((res: Array<GameIcon>) =>  {
      this.gameIcons = res;
    });
    this.electronStoreService.getStorage('icons').then((res: Map<string, GameIcon>) =>  {
      this.gameIconMap = res;
    });
    this.electronStoreService.getStorageList('terms').then((res: Array<GameTerm>) =>  {
      this.gameTerms = res;
    });
    this.electronStoreService.getStorage('backgrounds').then((res: Map<string, GameBackground>) =>  {
      this.gameBackgrounds = res;
    });
  }

  ngOnChanges() {
  }

  getText(text: string): string {
    return this.cardDataService.getAbilityText(text, 'term', 'term-img', this.gameTerms, this.gameIcons);
  }

  getIconSrc(name: string): string {
    if (!this.gameIconMap) {
      return '';
    }
    return this.gameIconMap[name].src;
  }

  getBackground() {
    if (this.monster.gameBackground && this.gameBackgrounds) {
      return this.gameBackgrounds[this.monster.gameBackground].src;
    }
  }
}
