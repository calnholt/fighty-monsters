import { Monster, Action } from '../monster/monster/monster';
import * as Monsters from './monsters.json';

export const loadMonsters = (): Array<Monster> => {
    const all = Monsters.monsters;
    let out = new Array<Monster>();
    all.forEach(json => {
        const monster = new Monster();
        let MONSTER_PROPERTIES = [
            'name',
            'speed',
            'defense',
            'imagePath',
            'lastUpdated',
        ];
        MONSTER_PROPERTIES.forEach(p => monster[p] = json[p]);
        monster.actions = new Array<Action>();
        const ACTIONS = 4;
        let ACTION_PROPERTIES = [
            'text',
            'innateText',
            'isDirect',
            'lastUpdated',
        ];
        for (let i = 0; i < ACTIONS; i++) {
            const action = new Action();
            ACTION_PROPERTIES.forEach(p => action[p] = json.actions[i][p]);
            monster.actions.push(action);
        }
        out = out.sort((a, b) => {
            if (a.name > b.name) {return 1; }
            if (a.name < b.name) {return -1; }
            return 0;
        });
        out.push(monster);
    });
    return out;
}