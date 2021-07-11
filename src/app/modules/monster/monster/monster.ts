import { ElectronStorageKey } from 'card-builder-framework';

export class GUI {
    isSelected?: boolean;
}

export class Monster extends GUI {
    name: ElectronStorageKey | string = '';
    speed: number = 0;
    defense: number = 0;
    actions: Array<Action> = new Array();
    gameBackground: string;
    monsterSrc: string;
    hp: number = 15;
    artist: string = '';
    setGameIconName: string = '';
}
export class Action {
    damage?: number = 1;
    isTrueDamage?: boolean = false;
    isDirect: boolean;
    text: string = '';
}

export class GameBackground {
    name: string;
    src: string;
}
