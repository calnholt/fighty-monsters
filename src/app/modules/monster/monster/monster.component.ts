import { Component, OnInit, ViewEncapsulation, Input, DoCheck } from '@angular/core';
import { GameBackground, Monster } from './monster';
import { CardDataService, ElectronStoreService, GameIcon, GameTerm, Path } from 'card-builder-framework';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Component({
  selector: 'monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonsterComponent implements OnInit, DoCheck {
  @Input() monster!: Monster;
  

  gameIcons: Array<GameIcon> = [];
  gameIconMap: Map<string, GameIcon> = new Map<string, GameIcon>();
  lockedGameIconMap: Map<string, GameIcon> = new Map<string, GameIcon>();
  gameTerms: Array<GameTerm> = [];
  gameBackgrounds: Map<string, GameBackground>;
  cardBackground: string;
  setInfo = '';
  setSrc: string = null;
  previousSet: string;

  constructor(
    private cardDataService: CardDataService,
    private electronStoreService: ElectronStoreService
  ) {
  }

  ngOnInit() {
    this.previousSet = this.monster.setGameIconName;
    this.getSetInfo();
    this.electronStoreService.getStorageList('icons').then((res: Array<GameIcon>) =>  {
      this.gameIcons = res;
      this.gameIcons.forEach(i => {
        this.gameIconMap.set(i.name, i);
        if (i.lockedName) {
          this.lockedGameIconMap.set(i.lockedName, i);
        }
      });
      if (this.monster.setGameIconName) {
        this.setSrc = this.gameIcons.find(i => i.name === this.monster.setGameIconName).src;
      }
    });
    this.electronStoreService.getStorageList('terms').then((res: Array<GameTerm>) =>  {
      this.gameTerms = res;
    });
    this.electronStoreService.getStorage('backgrounds').then((res: Map<string, GameBackground>) =>  {
      this.gameBackgrounds = res;
    });
  }

  ngDoCheck() {
    if (this.previousSet !== this.monster.setGameIconName) {
      this.previousSet = this.monster.setGameIconName;
      this.getSetInfo();
    }
  }

  getText(text: string): string {
    return this.cardDataService.getAbilityText(text, 'term', 'term-img', this.gameTerms, this.gameIcons);
  }

  getIconSrc(name: string): string {
    return this.cardDataService.getIconSrc(name, this.gameIconMap, this.lockedGameIconMap);
  }

  getBackground() {
    if (this.monster.gameBackground && this.gameBackgrounds) {
      return this.gameBackgrounds[this.monster.gameBackground].src;
    }
  }

  getSetInfo() {
    if (!this.monster.setGameIconName) {
      return;
    }
    this.electronStoreService.getStorageList('monsters').then((res: Array<Monster>) =>  {
      const filteredBySet = res.filter(m => m.setGameIconName === this.monster.setGameIconName);
      const index = filteredBySet.findIndex(m => m.name === this.monster.name);
      this.setInfo = `${index + 1}/${filteredBySet.length}`;
    });
  }
}
