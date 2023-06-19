import { noop } from '@technically/lodash';
import type { Rect } from 'rangefix';

export function convertClientRect(domRect: DOMRect | ClientRect | Rect): ClientRect;
export function convertClientRect(domRect: DOMRect | ClientRect | Rect | null): ClientRect | null;
export function convertClientRect(domRect: DOMRect | ClientRect | Rect | null) {
    if (!domRect) {
        return null;
    }

    /**
     * We have to manually re-create a ClientRect-shape object instead of `...rect`,
     * as `DOMRect` object properties are not enumerable.
     * @see https://github.com/microsoft/TypeScript/issues/9726
     */
    return {
        top: domRect.top,
        right: domRect.right,
        bottom: domRect.bottom,
        left: domRect.left,
        width: domRect.width,
        height: domRect.height,
        x: 'x' in domRect ? domRect.x : domRect.left,
        y: 'y' in domRect ? domRect.y : domRect.top,
        toJSON: noop,
    };
}
