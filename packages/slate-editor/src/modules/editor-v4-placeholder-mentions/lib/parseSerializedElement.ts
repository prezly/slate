import { isPlaceholderNode, PlaceholderKey, PlaceholderNode } from '@prezly/slate-types';

import createPlaceholderMention from './createPlaceholderMention';

const parseSerializedElement = (serialized: string): PlaceholderNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isPlaceholderNode(parsed)) {
        return createPlaceholderMention(parsed.key as PlaceholderKey);
    }

    return undefined;
};

export default parseSerializedElement;
