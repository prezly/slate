import { createDeserializeElement, Extension } from '@prezly/slate-commons';
import { DIVIDER_NODE_TYPE, isDividerNode } from '@prezly/slate-types';
import React, { RefObject } from 'react';
import { RenderElementProps } from 'slate-react';

import { DividerElement, DividerMenu } from './components';
import { DIVIDER_EXTENSION_ID, DIVIDER_TYPE } from './constants';
import { createDivider, normalizeRedundantDividerAttributes, parseSerializedElement } from './lib';

const DividerExtension = ({
    containerRef,
}: {
    containerRef: RefObject<HTMLElement>;
}): Extension => ({
    deserialize: {
        element: {
            [DIVIDER_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
            HR: createDivider,
        },
    },
    id: DIVIDER_EXTENSION_ID,
    normalizers: [normalizeRedundantDividerAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isDividerNode(element)) {
            return (
                <>
                    {attributes.ref.current && (
                        <DividerMenu containerRef={containerRef} element={attributes.ref.current} />
                    )}
                    <DividerElement attributes={attributes} element={element}>
                        {children}
                    </DividerElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [DIVIDER_TYPE],
    voidTypes: [DIVIDER_TYPE],
});

export default DividerExtension;
