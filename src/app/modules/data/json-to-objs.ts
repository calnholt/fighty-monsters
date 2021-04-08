import { Monster } from '../monster/monster/monster';
import * as Monsters from './monsters.json';

export const loadMonsters = (): Array<Monster> => {
    const all = Monsters.monsters;
    let out = new Array<Monster>();
    all.forEach(json => {
        const monster = json;
        out = out.sort((a, b) => {
            if (a.name > b.name) {return 1; }
            if (a.name < b.name) {return -1; }
            return 0;
        });
        out.push(monster);
    });
    return out;
}