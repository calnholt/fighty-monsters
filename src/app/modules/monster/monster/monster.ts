import { Path } from './../../data/data';
export class Monster {
    name: string;
    speed: number;
    defense: number;
    actions: Array<Action> = new Array();
    imagePath: Path;
}

export class Action {
    isDirect: boolean;
    text: string;
    innateText?: string;
}