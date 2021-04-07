import { IMAGE_CODES } from './../data/data';
import { Monster, Action } from './../monster/monster/monster';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterService } from '../monster/monster.service';

@Component({
  selector: 'monster-editor',
  templateUrl: './monster-editor.component.html',
  styleUrls: ['./monster-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MonsterEditorComponent implements OnInit {
  monster: Monster;
  originalMonster: Monster;
  imageCodes = IMAGE_CODES;

  constructor(
    private route: ActivatedRoute,
    private monsterSerivce: MonsterService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name: string = this.route.snapshot.paramMap.get('name');
      if (name === 'new') {
        this.createRandomMonster();
      } else {
        this.monster = this.monsterSerivce.getMonster(name);
      }
      this.originalMonster = Object.assign({}, this.monster);
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

  copy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    const json = JSON.stringify(this.monster, null, 2);
    selBox.value = json;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
