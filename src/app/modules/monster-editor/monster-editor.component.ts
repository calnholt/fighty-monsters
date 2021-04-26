import { Monster, Action, GameBackground } from './../monster/monster/monster';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectronStoreService, GameIcon, GameTerm } from 'card-builder-framework';

@Component({
  selector: 'monster-editor',
  templateUrl: './monster-editor.component.html',
  styleUrls: ['./monster-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonsterEditorComponent implements OnInit {
  monster: Monster;
  originalMonster: Monster;
  gameIcons: Array<GameIcon> = []
  gameTerms: Array<GameTerm> = [];
  gameBackgrounds: Array<GameBackground> = [];
  backgroundOptions: Array<string> = [];
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private electronStoreService: ElectronStoreService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name: string = this.route.snapshot.paramMap.get('name');
      if (name === 'new') {
        this.isNew = true;
        this.createRandomMonster();
      } else {
        this.electronStoreService.getStorageRecord('monsters', name).then((res: Monster) => {
          this.monster = res;
          this.originalMonster = Object.assign({}, res);
        });
      }
      this.electronStoreService.getStorageList('icons').then((res: Array<GameIcon>) => this.gameIcons = res);
      this.electronStoreService.getStorageList('terms').then((res: Array<GameTerm>) => this.gameTerms = res);
      this.electronStoreService.getStorageList('backgrounds').then((res: Array<GameBackground>) => {
        this.gameBackgrounds = res;
        this.backgroundOptions = res.map(g => g.name);
      });
    });
  }

  createRandomMonster() {
    this.monster = new Monster();
    this.monster.speed = Math.floor(Math.random() * 3);
    this.monster.defense = Math.floor(Math.random() * 3);
    this.monster.name = '';
    let a1 = new Action();
    a1.isDirect = true;
    let a2 = new Action();
    a2.isDirect = true;
    let a3 = new Action();
    a3.isDirect = false;
    let a4 = new Action();
    a4.isDirect = false;
    this.monster.actions = [a1,a2,a3,a4];
  }

  // need to delete old key/pair first to account for name change
  save() {
    if (this.originalMonster) {
      this.electronStoreService.deleteStorageRecord('monsters', this.originalMonster.name).then(res => {
        this.electronStoreService.saveStorageRecord('monsters', this.monster, this.monster.name).then((result: Monster) => {
          this.originalMonster = Object.assign({}, this.monster);
          alert("Saved!");
        });
      });
    }
    else {
      this.electronStoreService.saveStorageRecord('monsters', this.monster, this.monster.name).then((result: Monster) => {
        this.originalMonster = Object.assign({}, this.monster);
        alert("Saved!");
      });
    }
  }

  delete() {
    this.electronStoreService.deleteStorageRecord('monsters', this.originalMonster.name).then(res => {
      alert("Deleted!");
      this.router.navigate([''], {});
    });
  }

  copy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    // get all monsters
    const json = JSON.stringify(this.monster, null, 2);
    selBox.value = json;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
