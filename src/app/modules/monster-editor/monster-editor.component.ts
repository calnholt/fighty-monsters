import { MonstersModule } from './../monster/monsters.module';
import { IMAGE_CODES, BackgroundImageType, BACKGROUND_IMAGE_TYPES } from './../data/data';
import { Monster, Action, MonstersJson } from './../monster/monster/monster';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterService } from '../monster/monster.service';
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
  gameIcons: Array<GameIcon>;
  gameTerms: Array<GameTerm>;
  BACKGROUND_IMAGE_TYPES = BACKGROUND_IMAGE_TYPES;
  isNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private monsterSerivce: MonsterService,
    private electronStoreService: ElectronStoreService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name: string = this.route.snapshot.paramMap.get('name');
      if (name === 'new') {
        this.isNew = true;
        this.createRandomMonster();
      } else {
        this.monster = this.monsterSerivce.getMonster(name);
      }
      this.originalMonster = Object.assign({}, this.monster);
      this.electronStoreService.getLookupList('GAME_ICONS').then((res: Array<GameIcon>) => this.gameIcons = res);
      this.electronStoreService.getLookupList('GAME_TERMS').then((res: Array<GameTerm>) => this.gameTerms = res);
    });
  }

  createRandomMonster() {
    this.monster = new Monster();
    this.monster.speed = Math.floor(Math.random() * 3);
    this.monster.defense = Math.floor(Math.random() * 3);
    this.monster.monsterBackgroundImage = BACKGROUND_IMAGE_TYPES[Math.floor(Math.random() * BACKGROUND_IMAGE_TYPES.length)];
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

  copy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    // get all monsters
    let monsters = this.monsterSerivce.getMonsters();
    // remove GUI properties
    monsters.forEach(monster => delete monster.isSelected);
    // convert wrapper class to string
    if (this.isNew) {
      monsters.push(this.monster);
    }
    const json = JSON.stringify(new MonstersJson(monsters), null, 2);
    selBox.value = json;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
