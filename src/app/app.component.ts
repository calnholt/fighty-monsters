import { Component } from '@angular/core';
import { MonsterService } from './modules/monster/monster.service';
import { Router } from '@angular/router';
import { CardDataService, DropdownOption, ToolbarTab } from 'card-builder-framework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  searchOptions: Array<string>;
  tabs: Array<ToolbarTab>;
  constructor(
    private cardDataService: CardDataService, 
    private monsterService: MonsterService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.searchOptions = this.monsterService.getMonsters().map(m => m.name);
    this.tabs = [
      new ToolbarTab('Create', 'editor', 'new'),
      new ToolbarTab('TTS Export', 'tts'),
      new ToolbarTab('Utilities', 'utilities'),
    ];
  }

  goToPage(option: string) {
    this.router.navigate([`monsters/${option}`], {});
  }
}
