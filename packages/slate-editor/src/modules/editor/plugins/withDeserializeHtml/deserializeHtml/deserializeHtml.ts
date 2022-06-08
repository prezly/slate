import type { Extension } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import { createDeserializer } from '../createDeserialize';
import {
    normalizeGoogleDocsAppleNewlines,
    normalizeGoogleDocsDividers,
    normalizeOrphanListItems,
    normalizeOrphanListItemTexts,
    normalizeSlackLineBreaks,
    normalizeZeroWidthSpaces,
} from '../normalizers';

const normalizers = [
    normalizeGoogleDocsAppleNewlines,
    normalizeGoogleDocsDividers,
    normalizeOrphanListItems,
    normalizeOrphanListItemTexts,
    normalizeSlackLineBreaks,
    normalizeZeroWidthSpaces,
];

export function deserializeHtml(
    extensions: Extension[],
    html: string,
    onError: (error: unknown) => void,
): Descendant[] {
    const domParser = new DOMParser();
    const document = domParser.parseFromString(html, 'text/html');
    const normalizedDocument = normalizers.reduce(
        (result, normalize) => normalize(result),
        document,
    );
    const deserialize = createDeserializer(extensions, onError);
    const nodes = deserialize(normalizedDocument.body);
    return nodes;
}
