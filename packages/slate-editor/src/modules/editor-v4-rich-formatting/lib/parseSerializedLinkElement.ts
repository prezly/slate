import { LinkElementType } from '../types';

import createLink from './createLink';
import isLinkElement from './isLinkElement';

const parseSerializedLinkElement = (serialized: string): LinkElementType | undefined => {
    const parsed = JSON.parse(serialized);

    if (isLinkElement(parsed)) {
        return createLink(parsed.href);
    }

    return undefined;
};

export default parseSerializedLinkElement;
