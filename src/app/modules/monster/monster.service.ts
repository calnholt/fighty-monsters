import { Injectable } from '@angular/core';
import { Monster } from './monster/monster';
import { loadMonsters } from '../data/json-to-objs';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private monsters: Array<Monster>;

constructor() { }

loadMonsters() {
  this.monsters = loadMonsters();
  this.monsters.sort((a,b) => a.name.localeCompare(b.name));
}

getMonsters() {
  if (!this.monsters) {
    this.loadMonsters();
  }
  return this.monsters;
}

getMonster(name: string, useJson?: boolean): Monster {
  if (!this.monsters || useJson) {
    this.loadMonsters();
  }
  return this.monsters.find(m => m.name === name);
}

}
