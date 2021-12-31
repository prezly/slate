import type { Extension } from '@prezly/slate-commons';
import type { Descendant } from 'slate';

import createDeserialize from '../createDeserialize';
import {
    normalizeGoogleDocsAppleNewlines,
    normalizeGoogleDocsDividers,
    normalizeOrphanListItems,
    normalizeOrphanListItemTexts,
    normalizeSlackLineBreaks,
    normalizeZeroWidthSpaces,
} from '../normalizers';

const domParser = new DOMParser();

const normalizers = [
    normalizeGoogleDocsAppleNewlines,
    normalizeGoogleDocsDividers,
    normalizeOrphanListItems,
    normalizeOrphanListItemTexts,
    normalizeSlackLineBreaks,
    normalizeZeroWidthSpaces,
];

function deserializeHtml(
    extensions: Extension[],
    html: string,
    onError: (error: unknown) => void,
): Descendant[] {
    const document = domParser.parseFromString(html, 'text/html');
    const normalizedDocument = normalizers.reduce(
        (result, normalize) => normalize(result),
        document,
    );
    const deserialize = createDeserialize(extensions, onError);
    const nodes = deserialize(normalizedDocument.body);
    return nodes;
}

export default deserializeHtml;
