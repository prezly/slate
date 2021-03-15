import { PlaceholderMentionElementType } from '../types';

import createPlaceholderMention from './createPlaceholderMention';
import isPlaceholderMentionElement from './isPlaceholderMentionElement';

const parseSerializedElement = (serialized: string): PlaceholderMentionElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isPlaceholderMentionElement(parsed)) {
        return createPlaceholderMention(parsed.key);
    }

    return undefined;
};

export default parseSerializedElement;
