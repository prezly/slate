import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { PressContactElement } from '../press-contacts/components';
import {
    normalizeContactInfoAttributes,
    normalizeContactNodeAttributes,
    parseSerializedElement,
} from '../press-contacts/lib';

export const EXTENSION_ID = 'InlineContactExtension';

export function InlineContactsExtension(): Extension {
    return {
        id: EXTENSION_ID,
        deserialize: {
            element: composeElementDeserializer({
                [CONTACT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            }),
        },
        isRichBlock: isContactNode,
        isVoid: isContactNode,
        normalizeNode: [normalizeContactNodeAttributes, normalizeContactInfoAttributes],
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
    };
}
