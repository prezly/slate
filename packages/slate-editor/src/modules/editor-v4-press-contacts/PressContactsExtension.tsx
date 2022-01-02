import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { CONTACT_NODE_TYPE, isContactNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { PressContactElement, PressContactMenu } from './components';
import { PRESS_CONTACTS_EXTENSION_ID } from './constants';
import { normalizeRedundantPressContactAttributes, parseSerializedElement } from './lib';
import type { PressContactsParameters } from './types';

export const PressContactsExtension = ({ containerRef }: PressContactsParameters): Extension => ({
    deserialize: {
        element: {
            [CONTACT_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: PRESS_CONTACTS_EXTENSION_ID,
    normalizers: [normalizeRedundantPressContactAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isContactNode(element)) {
            return (
                <>
                    {attributes.ref.current && (
                        <PressContactMenu
                            containerRef={containerRef}
                            element={attributes.ref.current}
                        />
                    )}
                    <PressContactElement attributes={attributes} element={element}>
                        {children}
                    </PressContactElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [CONTACT_NODE_TYPE],
    voidTypes: [CONTACT_NODE_TYPE],
});

