import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { BOOKMARK_NODE_TYPE, isBookmarkNode } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { WebBookmarkElement } from './components';
import { normalizeRedundantWebBookmarkAttributes, parseSerializedElement } from './lib';

interface WebBookmarkExtensionParameters {
    withNewTabOption?: boolean;
}

export const EXTENSION_ID = 'WebBookmarkExtension';

export const WebBookmarkExtension = ({
    withNewTabOption = true,
}: WebBookmarkExtensionParameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: {
            [BOOKMARK_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isBookmarkNode,
    isVoid: isBookmarkNode,
    normalizeNode: [normalizeRedundantWebBookmarkAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isBookmarkNode(element)) {
            return (
                <>
                    <WebBookmarkElement
                        attributes={attributes}
                        element={element}
                        withNewTabOption={withNewTabOption}
                    >
                        {children}
                    </WebBookmarkElement>
                </>
            );
        }

        return undefined;
    },
});
