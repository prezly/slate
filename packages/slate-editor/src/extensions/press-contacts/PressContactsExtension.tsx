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
            // If these are contact references, then ContactInfo object is irrelevant
            if (element.reference || another.reference) {
                return element.reference === another.reference;
            }
            // Otherwise, compare ContactInfo ignoring node `uuid` and `reference`
            return isEqual(element.contact, another.contact);
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
