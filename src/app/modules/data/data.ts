export type Url = string;
export type Path = string;
export type Css = string;
export type ImageFile = string;

export const ICON_PATH: Path = `./assets/images`;
export const SYMBOLS_PATH: Path = ICON_PATH + `/symbols/`;
export const MONSTERS_PATH: Path = ICON_PATH + `/monsters/`;

export const TERM_KEYS = [] as const;
export type TermCode = typeof TERM_KEYS[number];
export const TERM_CODES = [];

export class Term {
    key: TermCode;
    value: string;
    name: string;

    constructor(name: string, key: TermCode, value: string) {
        this.key = key;
        this.value = value;
        this.name = name;
    }
}

export class Image {
    key: ImageCode;
    path: Path;

    constructor(key: ImageCode, path: Path) {
        this.key = key;
        this.path = path + '.png';
    }
}

const IMAGE_KEYS = [
    '[DAMAGE]', 
    '[TRUE_DAMAGE]', 
    '[-ATTACK]', 
    '[+ATTACK]', 
    '[POISON]', 
    '[HEAL]', 
    '[-DEFENSE]', 
    '[+DEFENSE]', 
    '[BLEED]', 
    '[+SPEED]', 
    '[-SPEED]', 
    '[SPEED]', 
    '[DEFENSE]',
    '[DIRECT]',
    '[INDIRECT]',
    '[HP]',
    '[INITIATIVE]',
    '[GUARD]',
] as const;
export type ImageCode = typeof IMAGE_KEYS[number];
export const IMAGE_CODES = [
    new Image('[DAMAGE]', SYMBOLS_PATH + 'damage'),
    new Image('[TRUE_DAMAGE]', SYMBOLS_PATH + 'true-damage'),
    new Image('[-ATTACK]', SYMBOLS_PATH + 'minus-attack'),
    new Image( '[+ATTACK]', SYMBOLS_PATH + 'plus-attack'),
    new Image( '[POISON]', SYMBOLS_PATH + 'poison'),
    new Image( '[HEAL]', SYMBOLS_PATH + 'heal'),
    new Image( '[-DEFENSE]', SYMBOLS_PATH + 'minus-defense'),
    new Image( '[+DEFENSE]', SYMBOLS_PATH + 'plus-defense'),
    new Image( '[BLEED]', SYMBOLS_PATH + 'bleed'),
    new Image( '[+SPEED]', SYMBOLS_PATH + 'plus-speed'),
    new Image( '[-SPEED]', SYMBOLS_PATH + 'minus-speed'),
    new Image( '[SPEED]', SYMBOLS_PATH + 'speed'),
    new Image( '[DEFENSE]', SYMBOLS_PATH + 'defense'),
    new Image( '[DIRECT]', SYMBOLS_PATH + 'direct'),
    new Image( '[INDIRECT]', SYMBOLS_PATH + 'indirect'),
    new Image( '[HP]', SYMBOLS_PATH + 'heart'),
    new Image( '[INITIATIVE]',SYMBOLS_PATH + 'initiative'),
    new Image( '[GUARD]',SYMBOLS_PATH + 'guard'),
];

export const BACKGROUND_IMAGE_TYPES = [
    'BLUE', 
    'GREEN', 
    'ORANGE', 
    'PURPLE', 
    'RED', 
];
export type BackgroundImageType = typeof BACKGROUND_IMAGE_TYPES[number];
