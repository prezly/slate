import type { Extension } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import { createDeserializer } from './createDeserialize';
import {
    normalizeGoogleDocsAppleNewlines,
    normalizeGoogleDocsDividers,
    normalizeOrphanListItems,
    normalizeOrphanListItemTexts,
    normalizeSlackLineBreaks,
    normalizeUselessBodyTags,
    normalizeZeroWidthSpaces,
} from './normalizers';

const normalizers = [
    normalizeGoogleDocsAppleNewlines,
    normalizeGoogleDocsDividers,
    normalizeOrphanListItems,
    normalizeOrphanListItemTexts,
    normalizeSlackLineBreaks,
    normalizeUselessBodyTags,
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
    return deserialize(normalizedDocument.body);
}
