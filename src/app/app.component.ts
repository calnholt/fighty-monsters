import { Component } from '@angular/core';
import { MonsterService } from './modules/monster/monster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  monsters: Array<string> = [];
  monster: any = {};

  constructor(private monsterService: MonsterService, private router: Router){}

  ngOnInit() {
    this.monsterService.getMonsters().forEach(m => this.monsters.push(m.name));
  }

  goToMonster() {
    this.router.navigate([`editor/${this.monster.name}`], {});
  }
}
