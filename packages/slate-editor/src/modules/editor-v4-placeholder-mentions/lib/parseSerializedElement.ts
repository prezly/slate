import { isPlaceholderNode, PlaceholderNode } from '@prezly/slate-types';
import { PlaceholderMentionElementType } from '../types';

import createPlaceholderMention from './createPlaceholderMention';

const parseSerializedElement = (serialized: string): PlaceholderMentionElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isPlaceholderNode(parsed)) {
        return createPlaceholderMention(parsed.key as PlaceholderNode['key']);
    }

    return undefined;
};

export default parseSerializedElement;
