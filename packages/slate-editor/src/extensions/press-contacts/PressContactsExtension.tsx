import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import React from 'react';

import { PressContactElement } from './components';
import { PRESS_CONTACTS_EXTENSION_ID } from './constants';
import { normalizeRedundantPressContactAttributes, parseSerializedElement } from './lib';

export const PressContactsExtension = (): Extension => ({
    id: PRESS_CONTACTS_EXTENSION_ID,
    deserialize: {
        element: {
            [CONTACT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isContactNode,
    normalizers: [normalizeRedundantPressContactAttributes],
    renderElement: ({ attributes, children, element }) => {
        if (isContactNode(element)) {
            return (
                <PressContactElement attributes={attributes} element={element}>
                    {children}
                </PressContactElement>
            );
        }

        return undefined;
    },
    rootTypes: [CONTACT_NODE_TYPE],
    voidTypes: [CONTACT_NODE_TYPE],
});
