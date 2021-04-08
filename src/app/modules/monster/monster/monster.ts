import { Path, BackgroundImageType } from './../../data/data';

export class Monster {
    name: string;
    speed: number;
    defense: number;
    actions: Array<Action> = new Array();
    cardBackgroundImage: BackgroundImageType;
    monsterBackgroundImage: BackgroundImageType;

}
export class Action {
    isDirect: boolean;
    text: string;
    innateText?: string;
}
export class MonstersJson {
    monsters: Array<Monster>;
    constructor(monsters: Array<Monster>) {
        this.monsters = monsters;
    }
}