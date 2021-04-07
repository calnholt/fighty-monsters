import { MonsterService } from './../monster/monster.service';
import { Component, OnInit } from '@angular/core';
import { Monster } from '../monster/monster/monster';
import html2canvas from 'html2canvas';

@Component({
  selector: 'tts',
  templateUrl: './tts.component.html',
  styleUrls: ['./tts.component.scss']
})
export class TtsComponent implements OnInit {

  monsters: Array<Monster>;
  timeout: number = 1500;

  constructor(private monsterService: MonsterService) { }

  ngOnInit() {
    this.monsters = this.monsterService.getMonsters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout((this.download).bind(this), this.timeout);
  }

  download() {
    html2canvas(document.querySelector('.tts-container')).then(canvas => {
      const a = document.createElement('a');
      a.setAttribute('download', `monsters.jpg`);
      a.setAttribute('href', canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream'));
      a.click();
    });
  }

}
