import { ImageElementType } from '../types';

import createImage from './createImage';
import isImageElement from './isImageElement';

const parseSerializedElement = (serialized: string): ImageElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isImageElement(parsed)) {
        return createImage(parsed.file, {
            children: parsed.children,
            href: parsed.href,
            layout: parsed.layout,
            width_factor: parsed.width_factor,
            width: parsed.width,
        });
    }

    return undefined;
};

export default parseSerializedElement;
