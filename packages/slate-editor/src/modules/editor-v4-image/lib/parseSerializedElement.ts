import { ImageNode, isImageNode } from '@prezly/slate-types';

import createImage from './createImage';

const parseSerializedElement = (serialized: string): ImageNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isImageNode(parsed)) {
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
