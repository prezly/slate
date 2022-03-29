import type { ImageNode } from '@prezly/slate-types';
import { isImageNode } from '@prezly/slate-types';

import { createImage } from './createImage';

export function parseSerializedElement(serialized: string): ImageNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isImageNode(parsed)) {
        return createImage({
            file: parsed.file,
            children: parsed.children,
            href: parsed.href,
            layout: parsed.layout,
            new_tab: parsed.new_tab,
            width: parsed.width,
        });
    }

    return undefined;
}
