import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import { isEqual } from 'lodash-es';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import { PressContactElement } from './components';
import {
    normalizeContactInfoAttributes,
    normalizeContactNodeAttributes,
    parseSerializedElement,
} from './lib';

export const EXTENSION_ID = 'PressContactExtension';

export const PressContactsExtension = (): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: composeElementDeserializer({
            [CONTACT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        }),
    },
    isElementEqual(element, another) {
        if (isContactNode(element) && isContactNode(another)) {
            // Compare ContactNodes ignoring node `uuid`
            return (
                isEqual(element.contact, another.contact) && element.reference === another.reference
            );
        }
        return undefined;
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
});
