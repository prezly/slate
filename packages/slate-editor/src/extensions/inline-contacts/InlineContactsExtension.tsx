import { createDeserializeElement, useRegisterExtension } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import { isEqual } from '@technically/lodash';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import {
    normalizeContactInfoAttributes,
    normalizeContactNodeAttributes,
    parseSerializedElement,
} from '../press-contacts';

import { InlineContactElement } from './components';

export const EXTENSION_ID = 'InlineContactExtension';

export function InlineContactsExtension() {
    return useRegisterExtension({
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
                    <InlineContactElement attributes={attributes} element={element}>
                        {children}
                    </InlineContactElement>
                );
            }

            return undefined;
        },
    });
}
