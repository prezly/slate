import type { HtmlNode } from '@prezly/slate-types';
import { isHtmlNode } from '@prezly/slate-types';

import { createHtmlBlock } from './createHtmlBlock';

export function parseSerializedElement(serialized: string): HtmlNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isHtmlNode(parsed)) {
        return createHtmlBlock(parsed);
    }

    return undefined;
}
