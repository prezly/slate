import type { QuoteNode } from '@prezly/slate-types';
import { isQuoteNode } from '@prezly/slate-types';

import { createBlockquote } from './createBlockquote';

export function parseBlockquoteElement(serialized: string): QuoteNode | undefined {
    const parsed = JSON.parse(serialized);

    if (isQuoteNode(parsed)) {
        return createBlockquote(parsed);
    }

    return undefined;
}
