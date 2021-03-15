import { createDeserializeElement, Extension } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { PressContactElement, PressContactMenu } from './components';
import { PRESS_CONTACT_TYPE, PRESS_CONTACTS_EXTENSION_ID } from './constants';
import {
    isPressContactElement,
    normalizeRedundantPressContactAttributes,
    parseSerializedElement,
} from './lib';
import { PressContactsParameters } from './types';

const PressContactsExtension = ({ containerRef }: PressContactsParameters): Extension => ({
    deserialize: {
        element: {
            [PRESS_CONTACT_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: PRESS_CONTACTS_EXTENSION_ID,
    normalizers: [normalizeRedundantPressContactAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isPressContactElement(element)) {
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
    rootTypes: [PRESS_CONTACT_TYPE],
    voidTypes: [PRESS_CONTACT_TYPE],
});

export default PressContactsExtension;
