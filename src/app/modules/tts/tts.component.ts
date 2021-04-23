import { MonsterService } from './../monster/monster.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Monster } from '../monster/monster/monster';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss']
})
export class TtsComponent implements OnInit {
  @ViewChild('tts', {static: true}) public template: TemplateRef<any>;
  monsters: Array<Monster>;

  constructor(
    private monsterService: MonsterService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name: string = this.route.snapshot.paramMap.get('name');
      if (name) {
        this.monsters = [this.monsterService.getMonster(name)];
      } else {
        this.monsters = this.monsterService.getMonsters();
      }
    });
  }
}
