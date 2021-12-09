import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { BOOKMARK_NODE_TYPE, isBookmarkNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import type { WebBookmarkParameters } from './types';
import { WebBookmarkElement, WebBookmarkMenu } from './components';
import { WEB_BOOKMARK_EXTENSION_ID } from './constants';
import { normalizeRedundantWebBookmarkAttributes, parseSerializedElement } from './lib';

export const WebBookmarkExtension = ({
    availableWidth,
    containerRef,
}: WebBookmarkParameters): Extension => ({
    deserialize: {
        element: {
            [BOOKMARK_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: WEB_BOOKMARK_EXTENSION_ID,
    normalizers: [normalizeRedundantWebBookmarkAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isBookmarkNode(element)) {
            return (
                <>
                    {attributes.ref.current && (
                        <WebBookmarkMenu
                            containerRef={containerRef}
                            element={attributes.ref.current}
                        />
                    )}
                    <WebBookmarkElement
                        attributes={attributes}
                        availableWidth={availableWidth}
                        element={element}
                    >
                        {children}
                    </WebBookmarkElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [BOOKMARK_NODE_TYPE],
    voidTypes: [BOOKMARK_NODE_TYPE],
});
