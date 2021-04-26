import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarTab, ElectronStoreService } from 'card-builder-framework';
import { Monster } from './modules/monster/monster/monster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  searchOptions: Array<string> = [''];
  tabs: Array<ToolbarTab>;
  constructor(
    private electronStoreService: ElectronStoreService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.electronStoreService.getStorageList('monsters').then((res: Array<Monster>) => {
      this.searchOptions = res.map(m => m.name).sort((a,b) => a.localeCompare(b));

    });
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
