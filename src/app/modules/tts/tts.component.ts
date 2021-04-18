import { MonsterService } from './../monster/monster.service';
import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster/monster/monster';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss']
})
export class TtsComponent implements OnInit {

  monsters: Array<Monster>;
  monster: Monster;
  timeout: number = 1500;

  constructor(
    private monsterService: MonsterService,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const name: string = this.route.snapshot.paramMap.get('name');
      if (name) {
        this.monster = this.monsterService.getMonster(name);
      } else {
        this.monsters = this.monsterService.getMonsters();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout((this.download).bind(this), this.timeout);
    });
  }

  download() {
    const css: string = this.monsters ? '.all-container' : '.single-container';
    html2canvas(document.querySelector(css)).then(canvas => {
      const a = document.createElement('a');
      a.setAttribute('download', this.monsters ? `monsters.png` : `${this.monster.name}.png`);
      a.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'));
      a.click();
    });
  }

}
