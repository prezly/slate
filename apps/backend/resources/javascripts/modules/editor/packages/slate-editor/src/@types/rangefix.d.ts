// Note: these types are incomplete and only provide the minimal information we need

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
