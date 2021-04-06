import { IMAGE_CODES } from './../data/data';
import { Monster } from './../monster/monster/monster';
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
      if (name === 'builder') {
        //this.createRandomMonster();
      } else {
        this.monster = this.monsterSerivce.getMonster(name);
      }
      this.originalMonster = Object.assign({}, this.monster);
    });
  }

}
