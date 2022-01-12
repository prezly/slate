// These typings are incomplete

declare module 'rangefix' {
    export interface Rect {
        bottom: number;
        height: number;
        left: number;
        right: number;
        top: number;
        width: number;
    }

    export function getBoundingClientRect(range: Range): ClientRect | Rect | null;
    export function getClientRects(range: Range): ClientRect[] | Rect[] | null;
}
