import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import React from 'react';

import { composeElementDeserializer } from '#modules/html-deserialization';

import {
    normalizeContactInfoAttributes,
    normalizeContactNodeAttributes,
    parseSerializedElement,
} from '../press-contacts/lib';

import { InlineContactElement } from './components';
import type { InlineContactsExtensionParameters } from './types';

export const EXTENSION_ID = 'InlineContactExtension';

export function InlineContactsExtension({
    renderForm,
}: InlineContactsExtensionParameters): Extension {
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
                    <InlineContactElement
                        attributes={attributes}
                        element={element}
                        renderForm={renderForm}
                    >
                        {children}
                    </InlineContactElement>
                );
            }

            return undefined;
        },
    };
}
