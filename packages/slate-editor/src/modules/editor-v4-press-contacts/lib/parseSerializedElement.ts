import { ContactNode, isContactNode } from '@prezly/slate-types';

import createPressContact from './createPressContact';

const parseSerializedElement = (serialized: string): ContactNode | undefined => {
    const parsed = JSON.parse(serialized);

    if (isContactNode(parsed)) {
        return createPressContact(parsed.contact);
    }

    return undefined;
};

export default parseSerializedElement;
