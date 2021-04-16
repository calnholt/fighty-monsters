import { Path, BackgroundImageType } from './../../data/data';

export class GUI {
    isSelected?: boolean;
}

export class Monster extends GUI {
    name: string = '';
    speed: number = 0;
    defense: number = 0;
    actions: Array<Action> = new Array();
    monsterBackgroundImage: BackgroundImageType;

}
export class Action {
    damage?: number = 1;
    isDirect: boolean;
    text: string = '';
    innateText?: string;
}
export class MonstersJson {
    monsters: Array<Monster>;
    constructor(monsters: Array<Monster>) {
        this.monsters = monsters;
    }
}