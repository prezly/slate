export enum Alignment {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right',
}

export interface Alignable {
    align?: Alignment;
}
